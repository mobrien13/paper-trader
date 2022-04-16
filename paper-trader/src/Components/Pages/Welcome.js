import React from 'react';
import './Welcome.css';
import './Pages.css';
import image1 from '../../images/p1.jpeg'
import image2 from '../../images/p2.jpeg'
import image3 from '../../images/pCCL.jpg'
import {Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {signup, useAuth, setUserWatchList } from '../../firebase'

function Welcome() {

    return (
    <>
        
        
        <div className='firstDiv'>
        <div2>
            <h1>What Do We Do?</h1>
            <p>Paper Trader is a live updating stock trading simulator. Using a virtual balance of fake currency, you can practice trading to develop or refine positive investment habits.</p>
        </div2> 
        
        <div3>
            <h1>About Us</h1>
            <p>Our team wanted to create a way for the casual invester to get into the trading market. With this concept we created Paper Trader. We created Paper Trader with the intention of providing a user-friendly trading simulator unlike any other.</p>
        </div3>
        </div>
        <divH>
       
            <div>
                <img className='welcomeImage' src={image1} alt="MoneyPT"/>
            </div>
            <div>
                <img className='welcomeImage' src={image3} alt="Paper" />
            </div>
            <div>
                <img className='welcomeImage' src={image2} alt="MoneyPT2"/>
            </div>

        
        </divH>
    </>
    );
  }
  
  
  export default Welcome;