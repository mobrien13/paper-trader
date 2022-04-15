import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";
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

//initializes firestore
const db = getFirestore(app);

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
      watchlist: ["tsla", "aapl"]
    });
    console.log("Successfully added user to usersData");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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