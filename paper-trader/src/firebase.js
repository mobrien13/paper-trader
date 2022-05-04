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

//creates user object to be called everywhere 
const user = {
  firestname: String,
  lastname: String,
}

//authorizes user
const auth = getAuth();


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
      holdings:[{}],
      // holdings: [{
      //   ticker: "tsla",
      //   amount: 1,
      //   buyPrice: 420,
      //   isSold: false,
      //   sellPrice: null,
      //   timebought: Date.now(),
      //   timesold: null
      // }],
      reciepts: [{

      }]
    });
    console.log("Successfully added user to usersData");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//buy stock 
export async function buyStock(ticker, price, quantity) {
  try {
    //setup query
    const userUid = auth.currentUser.uid
    const col = collection(db, "usersData")
    const q = query(col, where("uid", "==", userUid))
    // let oldHoldings = []

    //query
    const querySnapshot = await getDocs(q)

    //old holdings
    // oldHoldings = querySnapshot.docs[0].data().orders.holdings;

    //create docRef
    const docRef = doc(db, "usersData", querySnapshot.docs[0].id);

    //push new stock to holdings array
    await updateDoc(docRef, {
      holdings: arrayUnion(
        {
          ticker: ticker.toUpperCase(),
          amount: quantity,
          buyPrice: price,
          isSold: false,
          sellPrice: null,
          timebought: Date.now(),
          timesold: null
        }
      )
    });


    return true;
  }
  catch (e) {
    console.log(e.toString());
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

    console.log(newArray)

    return newArray;
  }
  catch (e) {
    return [{
        ticker: "HOLDINGS DOES NOT EXIST",
        amount: null,
        buyPrice: null,
        isSold: false,
        sellPrice: null,
        timebought: null,
        timesold: null

    }];
  }
}

export async function sellStock(ticker, price) {
  console.log(ticker)
  ticker = ticker.toLowerCase()
  const userUid = auth.currentUser.uid
  const holdings = collection(db, "holdings")
  const q = query(holdings, where("uid", "==", userUid), where("ticker", "==", ticker))
  const querySnapshot = await getDocs(q)

  const docRef = doc(db, "holdings", querySnapshot.docs[0].id)

  await updateDoc(docRef, {
    isSold: true,
    sellPrice: price,
    date: Timestamp.now()

  })
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

