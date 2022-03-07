import './Signup.css';
import {signup, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';


    

    function Signup(){ 
        const [ loading, setLoading] = useState(false);
        const currentUser = useAuth();
        
        const emailRef = useRef()
        const passwordRef = useRef()

        async function handleSignup ()  {
            try{
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value)
            } catch{
                alert("Error!")
            }
            setLoading(false);
        }

        return(
            <>
            <h1>Sign Up</h1>
            <div>
                <input ref = {emailRef} placeholder = "Email" />
                <input ref = {passwordRef} type = "password" placeholder = "Password" />
            </div>

            <Button disable = {loading} onClick={handleSignup}>Sign Up</Button>
            

            </>
        );
    }

    export default Signup;