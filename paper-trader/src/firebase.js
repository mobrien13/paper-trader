import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyC8BtJeetmmRyCk5OHFgHowu93o52UQHDo",
    authDomain: "paper-trader-53ba3.firebaseapp.com",
    projectId: "paper-trader-53ba3",
    storageBucket: "paper-trader-53ba3.appspot.com",
    messagingSenderId: "613651748321",
    appId: "1:613651748321:web:c70a2b4775621ad29eeea0"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

//Custom hook for userAuth refresh

export function useAuth() {
    //this is complicated so no touchy 
    //it gets user and sets user 
    //it has embedded functions which are confusing

    const [currentUser, setCurrentUser] = useState();

    useEffect(()=> {
        const unsub =  onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;

}