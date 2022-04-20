import './Login.css';
import {login, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props){
    //refs and states
    const [ loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef()

    //checks if enter is clicked
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleLogin();
        }
    }

    //login the user
    async function handleLogin ()  {

        //try catch that throws error if password does not match
        try{
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
            props.closeModal();
        } catch(e){
            //throws error here,
            alert("Error!" + e)
        }
        //this stops page from loading to stop users from spam attacking 
        setLoading(false);
    }


    //component's jsx
    return(
        <>
        <h1>Log In</h1>
        <div>
            {/* //this creates inpit field and setss email ref to use log in func */}
            <input autoFocus id='email' className='signInFields' ref = {emailRef} onKeyPress={ handleKeyPress } placeholder = "Email" /><br/>
            {/* //this creates secure input field and sets password ref to use log in func */}
            <input className='signInFields' ref = {passwordRef} onKeyPress={ handleKeyPress } type = "password" placeholder = "Password" /><br/>
        </div>

        {/*Displays button*/}
        <Button className="buttons" buttonStyle="btn--primary--outline" disable = {loading} onClick={handleLogin}>Log In</Button>
        

        </>
    );
  }
  
  export default Login;