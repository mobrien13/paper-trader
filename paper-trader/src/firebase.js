import { async } from "@firebase/util";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDoc, query, where, getDocs, deleteField, updateDoc, doc, setDoc, Timestamp, arrayUnion } from "firebase/firestore";
import { useState, useEffect } from "react";

//struct for firebase data DO NOT TOUCH THIS
export const firebaseConfig = {
  apiKey: "AIzaSyC8BtJeetmmRyCk5OHFgHowu93o52UQHDo",
  authDomain: "paper-trader-53ba3.firebaseapp.com",
  projectId: "paper-trader-53ba3",
  storageBucket: "paper-trader-53ba3.appspot.com",
  messagingSenderId: "613651748321",
  appId: "1:613651748321:web:c70a2b4775621ad29eeea0"
}

//initilizes firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//authorizes user
const auth = getAuth();



/* ----------------------- START FIRESTORE FUNCTIONS ----------------------- */



//add user to usersData - this function is called in signup directly after an account is created successfully
export async function addUserToUsersData() {
  try {
    const userUid = auth.currentUser.uid;
    const docRef = await addDoc(collection(db, "usersData"), {
      //this builds users data, giving them tsla as a holding
      uid: userUid,
      firstName: "John",
      lastName: "Doe",
      funds: 1000,
      watchlist: ["TSLA", "BDX"],
      holdings: [{}],
    });
    console.log("Successfully added user to usersData");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//buy stock 
export async function buyStock(ticker, price, quantity) {
  //checks if the quantity contains any letters
  if(/[a-z]/i.test(quantity)){
    return false;
  }

  try {
    //setup query
    const userUid = auth.currentUser.uid
    const col = collection(db, "usersData")
    const q = query(col, where("uid", "==", userUid))
    // let oldHoldings = []

    //query
    const querySnapshot = await getDocs(q)

    //create docRef
    const docRef = doc(db, "usersData", querySnapshot.docs[0].id);

    //push new stock to holdings array
    await updateDoc(docRef, {
      holdings: arrayUnion(
        {
          ticker: ticker.toUpperCase(),
          quantity: quantity * 1.0,
          quantitySold: 0 * 1.0,
          buyPrice: price * 1.0,
          isClosed: false,
          isValid: true,
          sellPrice: null,
          timebought: Date.now(),
          timesold: null
        }
      )
    });
    //returns true if the action was completed
    return true;
  }
  catch (e) {
    //returns false and console logs error if it was unsuccessful
    console.log(e);
    return false;
  }
}

//get holdings
export async function getHoldings() {
  try {
    const userUid = auth.currentUser.uid
    const col = collection(db, "usersData")
    const q = query(col, where("uid", "==", userUid))
    const newArray = []

    const querySnapshot = await getDocs(q)

    for (let i = 0; i < querySnapshot.docs[0].data().holdings.length; i++) {
      newArray.push(querySnapshot.docs[0].data().holdings[i])
    }

    return newArray;
  }
  catch (e) {
    return [{
      ticker: "HOLDINGS DOES NOT EXIST",
      quantity: null,
      buyPrice: null,
      isClosed: false,
      isValid: true,
      sellPrice: null,
      timebought: null,
      timesold: null
    }];
  }
}

//Get past orders function returns the closed orders - Note: this function replaces the obsolete get receipts function
export async function getPastOrders() {
  try {
    const userUid = auth.currentUser.uid
    const col = collection(db, "usersData")
    const q = query(col, where("uid", "==", userUid))
    const newArray = []

    const querySnapshot = await getDocs(q)

    //loops through all of the closed holdings and adds them to an array
    for (let i = 0; i < querySnapshot.docs[0].data().holdings.length; i++) {
      if(querySnapshot.docs[0].data().holdings[i].isClosed){
        newArray.push(querySnapshot.docs[0].data().holdings[i])
      }
    }

    //returns the array
    return newArray;
  }

  catch (e) {
    return [{
      ticker: "DOES NOT EXIST",
      quantity: null,
      buyPrice: null,
      isValid: false,
      isClosed: false,
      sellPrice: null,
      timebought: null,
      timesold: null
    }];
  }
}

export async function sellStock(ticker, price, quantity) {

  /* ------------------- HOW THIS FUNCTION WORKS ------------------- */
  /* ------------------- READ BEFORE MODIFYING ------------------- */


  /*

  1. Gets the entire holdings array from the database and assigns it to a temporary array that we modify and later send back to database

  2. Iterates through the array of holdings. Does logic when it finds a matching ticker
    -This process occurs IN ORDER by PURCHASE DATE. This is how it needs to be in order for the portfolio graph to work
    -DO NOT commit any code that will UNSORT the holdings array
    -The logic is explained at each if statement

  3. UNIMPLEMENTED: If shares remain, the last if-statement before the return will be triggered
    -This should cause a NEW short selling position to be created. This will require changes to the BUY function
    -Will implement at later date if time allows

  4. Return true when complete. If at any time an error is caught, return false. This is used to generate a success or error message in the BUY/SELL Modal

  */

  //added a check to see if the quantity contains letters
  if(/[a-z]/i.test(quantity)){
    return false;
  }

  try {
    //sets up initial query
    const userUid = auth.currentUser.uid
    const col = collection(db, "usersData")
    const q = query(col, where("uid", "==", userUid))

    //does query
    const querySnapshot = await getDocs(q)

    //sets consts for us later
    const docId = querySnapshot.docs[0].id
    const docRef = doc(db, "usersData", docId)

    //temp holdings will store the modified holdings array that is pushed back into firestore
    let tempHoldings = querySnapshot.docs[0].data().holdings;

    //this var is an summation of all of the shares sold as the loop iterates
    let totalSold = 0;

    //loops through all of the indidual holding objects in the holdings array
    for (let i = 0; i < querySnapshot.docs[0].data().holdings.length; i++) {
      //Only does any code if there are remaining shares to be sold
      if (totalSold < quantity) {

        //If the ticker matches, continue. Else loop again
        if (querySnapshot.docs[0].data().holdings[i].ticker === ticker) {

          //If the current holding is not closed, continue. Else, loop again
          if (!querySnapshot.docs[0].data().holdings[i].isClosed) {

            //If the quantity in the database minus the quantity already sold in the database is equal to the quantity minus the total sold
            //Flag the order as closed, sell all the remaining shares
            if ((querySnapshot.docs[0].data().holdings[i].quantity - querySnapshot.docs[0].data().holdings[i].quantitySold) === (quantity - totalSold)) {
              //First, calculated the weighted average sell price (the average of the previous sales combined with the average of this sale, while accounting for the number of shares sold each time)
              let weightedAvgSellPrice;

              if (tempHoldings[i].quantitySold > 0 && tempHoldings[i].quantitySold !== null) {
                weightedAvgSellPrice = ((tempHoldings[i].sellPrice * tempHoldings[i].quantitySold) + (price * (quantity - totalSold))) / (quantity - totalSold + tempHoldings[i].quantitySold);
              }
              else {
                weightedAvgSellPrice = price;
              }

              //use the weighted avg sell price to update the sell price

              tempHoldings[i] = {
                ticker: tempHoldings[i].ticker,
                quantity: tempHoldings[i].quantity * 1.0,
                quantitySold: tempHoldings[i].quantitySold * 1.0 + quantity * 1.0 - totalSold * 1.0, //the quantity sold needs the * 1.0 to ensure that it typecasts to numbers before adding and subtracting. prior to doing this it would concatinate them as strings sometimes. i hate javascript for not being strongly typed 
                buyPrice: tempHoldings[i].buyPrice * 1.0,
                isClosed: true,
                isValid: true,
                sellPrice: weightedAvgSellPrice * 1.0,
                timebought: tempHoldings[i].timebought,
                timesold: Date.now()
              };

              //update the total amount sold
              totalSold = quantity;
            }

            //If the quantity in the database minus the quantity sold in the database is less than the quantity
            //The order should be closed and the remaining stocks sold. Then it should continue looping and try to sell the rest on other orders
            else if ((querySnapshot.docs[0].data().holdings[i].quantity - querySnapshot.docs[0].data().holdings[i].quantitySold) < (quantity - totalSold)) {
              //see previous comments
              let weightedAvgSellPrice;

              if (tempHoldings[i].quantitySold > 0 && tempHoldings[i].quantitySold !== null) {
                weightedAvgSellPrice = ((tempHoldings[i].sellPrice * tempHoldings[i].quantitySold) + (price * (quantity - totalSold))) / (quantity - totalSold + tempHoldings[i].quantitySold);
              }
              else {
                weightedAvgSellPrice = price;
              }

              tempHoldings[i] = {
                ticker: tempHoldings[i].ticker,
                quantity: tempHoldings[i].quantity * 1.0,
                quantitySold: tempHoldings[i].quantity * 1.0,
                buyPrice: tempHoldings[i].buyPrice * 1.0,
                isClosed: true,
                isValid: true,
                sellPrice: weightedAvgSellPrice * 1.0,
                timebought: tempHoldings[i].timebought,
                timesold: Date.now()
              };

              totalSold += querySnapshot.docs[0].data().holdings[i].quantity - querySnapshot.docs[0].data().holdings[i].quantitySold;
            }


            //If the quantity in the database minus the quantity sold in the database is greater than the quanity remaining to sell
            //Sell some of the shares, but do not mark as closed because the user still owns some number of shares
            else if ((querySnapshot.docs[0].data().holdings[i].quantity - querySnapshot.docs[0].data().holdings[i].quantitySold) > (quantity - totalSold)) {
              //see previous comments

              let weightedAvgSellPrice;

              if (tempHoldings[i].quantitySold > 0 && tempHoldings[i].quantitySold !== null) {
                weightedAvgSellPrice = ((tempHoldings[i].sellPrice * tempHoldings[i].quantitySold) + (price * (quantity - totalSold))) / (quantity - totalSold + tempHoldings[i].quantitySold);
              }
              else {
                weightedAvgSellPrice = price;
              }

              tempHoldings[i] = {
                ticker: tempHoldings[i].ticker,
                quantity: tempHoldings[i].quantity * 1.0,
                quantitySold: tempHoldings[i].quantitySold * 1.0 + quantity * 1.0 - totalSold * 1.0,
                buyPrice: tempHoldings[i].buyPrice * 1.0,
                isClosed: false,
                isValid: true,
                sellPrice: weightedAvgSellPrice * 1.0,
                timebought: tempHoldings[i].timebought,
                timesold: Date.now()
              };

              //adds to the total the previous quanitity - the previous quantity sold which is equal to the amount added to the quantity
              totalSold = quantity;
            }
          }
        }
      }
      //breaks out of the loop if the totalSold is greater than or equal to the quantity the user is trying to sell. this is here for the sole purpose of improving speed ever so slightly
      else {
        break;
      }
    }

    //if it gets passed the previous ones after the loops end, and total sold<quantity, then the user wants to short
    //dissallow the short position for now (do nothing), implement later
    if (totalSold > quantity) {
      //create a short position
    }

    //Update the doc with the new holdings and receipts
    await updateDoc(docRef, {
      holdings: tempHoldings
    })

    //return true after everything is done
    return true;

  }
  catch (e) {
    //logs error to console then returns false
    console.log(e)
    return false;
  }

}

//get user watchlist data
export async function getUserWatchList() {
  try {
    //create collection ref
    const usersDataRef = collection(db, "usersData");

    //query the collection
    const q = query(usersDataRef, where("uid", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data().watchlist;
  }
  catch (e) {
    return [];
  }
}

//set user watchlist data - pass in the new watchlist that the user wants. 
// THE OLD WATCHLIST WILL BE DESTROYED. 
// if you want to remove an element/add an element do it elsewhere. 
// this is ONLY for querying the database
export async function setUserWatchList(watchlist) {
  //create collection ref
  const usersDataRef = collection(db, "usersData");

  //query database to get usersData document id
  const q = query(usersDataRef, where("uid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);

  const docId = querySnapshot.docs[0].id;

  //create new ref to the specific document
  const docRef = doc(db, "usersData", docId);

  //add the watchlist
  await updateDoc(docRef, {
    watchlist: watchlist
  });
}

//add to watchlist
export async function addToWatchlist(ticker) {
  //get watchlist
  //create collection ref
  const usersDataRef1 = collection(db, "usersData");

  //query the collection
  const q1 = query(usersDataRef1, where("uid", "==", auth.currentUser.uid));

  const querySnapshot1 = await getDocs(q1);

  //set watchlist
  let watchlist = querySnapshot1.docs[0].data().watchlist;

  //check if ticker is in watchlist already
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].toUpperCase() === ticker.toUpperCase()) {
      console.log(ticker.toUpperCase() + " is already in the watchlist");
      return;
    }
  }

  //push ticker to watchlist
  watchlist.push(ticker)

  //create collection ref
  const usersDataRef = collection(db, "usersData");

  //query database to get usersData document id
  const q = query(usersDataRef, where("uid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);

  const docId = querySnapshot.docs[0].id;

  //create new ref to the specific document
  const docRef = doc(db, "usersData", docId);

  //add the watchlist
  await updateDoc(docRef, {
    watchlist: watchlist
  });
}



/* ----------------------- END FIRESTORE FUNCTIONS ----------------------- */



/* ----------------------- START FIREBASE AUTHENTICATION FUNCTIONS ----------------------- */



//simplified signup function
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

//simplified login funtion
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

//logs user out
export function logout() {
  return signOut(auth)
}

//Custom hook for userAuth refresh
export function useAuth() {
  //this is complicated so no touchy 
  //it gets user and sets user 
  //it has embedded functions which are confusing

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;

}

