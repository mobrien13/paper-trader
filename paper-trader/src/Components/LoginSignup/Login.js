import './Login.css';
import {login, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';

function Login(){
    const [ loading, setLoading] = useState(false);
    const currentUser = useAuth();
    
    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleSignup ()  {
        try{
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            
        } catch{
            alert("Error!")
        }
        setLoading(false);
    }

    return(
        <>
        <h1>Log In</h1>
        <div>
            <input className='signInFields' ref = {emailRef} placeholder = "  Email" /><br/>
            <input className='signInFields' ref = {passwordRef} type = "password" placeholder = "  Password" /><br/>
        </div>

        <Button className="buttons" buttonStyle="btn--primary--outline" disable = {loading} onClick={handleSignup}>Log In</Button>
        

        </>
    );
  }
  
  export default Login;