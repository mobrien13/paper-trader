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
        try{
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
            props.closeModal();
        } catch{
            alert("Error!")
        }
        setLoading(false);
    }


    //component's jsx
    return(
        <>
        <h1>Log In</h1>
        <div>
            <input autoFocus id='email' className='signInFields' ref = {emailRef} onKeyPress={ handleKeyPress } placeholder = "Email" /><br/>
            <input className='signInFields' ref = {passwordRef} onKeyPress={ handleKeyPress } type = "password" placeholder = "Password" /><br/>
        </div>

        <Button className="buttons" buttonStyle="btn--primary--outline" disable = {loading} onClick={handleLogin}>Log In</Button>
        

        </>
    );
  }
  
  export default Login;