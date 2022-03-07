import React from 'react';
import './Welcome.css';
import './Pages.css';
import {Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {signup, useAuth } from '../../firebase'

function Welcome() {
    return (
    <>
        <h1>Welcome</h1>
        { useAuth()?.email }
        
    </>
    );
  }
  
  
  export default Welcome;