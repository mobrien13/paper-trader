import './Signup.css';
import { signup, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';




function Signup() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef()
    const emailConfirmRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    async function handleSignup() {
        if (passwordConfirmRef === passwordRef && emailConfirmRef === emailRef) {
            try {
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value)
            } catch {
                alert("Error!")
            }
        }
        else{
            alert("Emails or Passwords Do Not Match")
        }

        setLoading(false);
    }

    return (
        <>
            <h1>Sign Up</h1>
            <div>
                <input className='signInFields' ref={emailRef} placeholder="  Email" /><br/>
                <input className='signInFields' ref={emailConfirmRef} placeholder="  Confirm Email" /><br/>
                <input className='signInFields' ref={passwordRef} type="password" placeholder="  Password" /><br/>
                <input className='signInFields' ref={passwordConfirmRef} type="password" placeholder="  Confirm Password" /><br/>
            </div>

            <Button disable={loading} buttonStyle="btn--primary--outline" onClick={handleSignup}>Sign Up</Button>


        </>
    );
}

export default Signup;