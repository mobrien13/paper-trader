import './Login.css';
import {login, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props){
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleLogin();
        }
    }

    const [ loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const navigate = useNavigate();
    
    const emailRef = useRef()
    const passwordRef = useRef()

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

    return(
        <>
        <h1>Log In</h1>
        <div>
            <input className='signInFields' ref = {emailRef} onKeyPress={ handleKeyPress } placeholder = "Email" /><br/>
            <input className='signInFields' ref = {passwordRef} onKeyPress={ handleKeyPress } type = "password" placeholder = "Password" /><br/>
        </div>

        <Button className="buttons" buttonStyle="btn--primary--outline" disable = {loading} onClick={handleLogin}>Log In</Button>
        

        </>
    );
  }
  
  export default Login;