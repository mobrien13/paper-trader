import React from 'react';
import './Welcome.css';
import './Pages.css';
import image1 from '../../images/MoneyImgPT.jpg'
import image2 from '../../images/MoneyImg2PT.jpg'
import image3 from '../../images/Paper.jpg'
import {Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import {signup, useAuth } from '../../firebase'

function Welcome() {
    return (
    <>
        
        <h1>Welcome</h1>
        <divH>
        <div2>
            <h1>What Do We Do?</h1>
            <p>Paper Trader is a live updating stock trading simulator. Using a virtual balance of fake currency, you can practice trading to develop or refine positive investment habits.</p>
        </div2>
        
        <div3>
            <h1>About Us</h1>
            <p>Our team wanted to create a way for the casual invester to get into the trading market. With this concept we created Paper Trader. We created Paper Trader with the intention of providing a user-friendly trading simulator unlike any other.</p>
        </div3>
        </divH>
        <divH>
       
            <div>
                <img src={image1} alt="MoneyPT" width="500" height="333"/>
            </div>
            <div>
                <img src={image3} alt="Paper" width="500" height="333"/>
            </div>
            <div>
                <img src={image2} alt="MoneyPT2" width="500" height="333"/>
            </div>

        
        </divH>
    </>
    );
  }
  
  
  export default Welcome;