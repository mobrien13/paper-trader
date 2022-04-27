import { async } from "@firebase/util";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDoc, query, where, getDocs, deleteField, updateDoc, doc, setDoc, Timestamp } from "firebase/firestore";
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
      uid: userUid,
      firstName: "John",
      lastName: "Doe",
      funds: 1000,
      watchlist: ["tsla", "bdx"]
    });
    console.log("Successfully added user to usersData");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//buy stock 
export async function buyStock(ticker, price, quantity) { 
  const userUid = auth.currentUser.uid
  const holdings = collection(db, "holdings")
  const q = query(holdings, where("uid", "==", userUid))
  const querySnapshot = await getDocs(q)
  const timeBought = Timestamp.now()

  for(let x = 0; x < querySnapshot.docs.length; x++){
    if (querySnapshot.docs[x].data().ticker === ticker )
    return false
  }

  const docRef = await addDoc(collection(db, "holdings"), { 
    uid: userUid,
    ticker: ticker,
    buyPrice: price,
    sellPrice: 0,
    quantity: quantity,
    isSold: false,
    date: timeBought
  })
  return true
}

//get holdings
export async function getHoldings(){
  const userUid = auth.currentUser.uid
  const holdings = collection(db, "holdings")
  const q = query(holdings, where("uid", "==", userUid))
  const newArray = []

  const querySnapshot = await getDocs(q)

  for(let x = 0; x < querySnapshot.docs.length; x++){
    newArray.push(querySnapshot.docs[x].data())
  }

  return newArray;
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
  //create collection ref
  const usersDataRef = collection(db, "usersData");

  //query the collection
  const q = query(usersDataRef, where("uid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs[0].data().watchlist;
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
  for(let i=0; i<watchlist.length; i++){
    if(watchlist[i].toUpperCase() === ticker.toUpperCase()){
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

