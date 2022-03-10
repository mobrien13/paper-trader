import './Signup.css';
import { signup, useAuth } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';

function Signup(props) {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef()
    const emailConfirmRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSignup();
        }
    }

    async function handleSignup() {
        if (passwordConfirmRef.current.value !== passwordRef.current.value || emailConfirmRef.current.value !== emailRef.current.value) {
            alert("Emails or Passwords Do Not Match")
        }
        else{
            try {
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value)
                props.closeModal()
            } catch {
                alert("Error!")
            }
        }

        setLoading(false);
    }

    return (
        <>
            <h1>Sign Up</h1>
            <div>
                <input className='signInFields' ref={emailRef} onKeyPress={ handleKeyPress } placeholder="Email" /><br/>
                <input className='signInFields' ref={emailConfirmRef} onKeyPress={ handleKeyPress } placeholder="Confirm Email" /><br/>
                <input className='signInFields' ref={passwordRef} onKeyPress={ handleKeyPress } type="password" placeholder="Password" /><br/>
                <input className='signInFields' ref={passwordConfirmRef} onKeyPress={ handleKeyPress } type="password" placeholder="Confirm Password" /><br/>
            </div>

            <Button disable={loading} buttonStyle="btn--primary--outline" onClick={handleSignup}>Sign Up</Button>


        </>
    );
}

export default Signup;