import './Signup.css';
import { signup, useAuth, addUserToUsersData } from '../../firebase'
import Button from '../Button/Button'
import { useRef, useState } from 'react';

function Signup(props) {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef()
    const emailConfirmRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [signupError, setSignupError] = useState(false);
    const [errorText, setErrorText] = useState("")

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSignup();
        }
    }

    async function handleSignup() {

        //checks if email matches email confimation, and password matches password confirmation
        if (passwordConfirmRef.current.value !== passwordRef.current.value || emailConfirmRef.current.value !== emailRef.current.value) {
            setErrorText("Emails or Passwords Do Not Match")
            setSignupError(true);
        }
        else{
            // if email and password match confirmations, does try catch to create account
            try {
                setLoading(true);
                setSignupError(false);
                //actual signup function
                await signup(emailRef.current.value, passwordRef.current.value)

                //adds user to the database
                await addUserToUsersData();

                //closes modal
                props.closeModal()

            } catch (e){
                // throws error if any issue creating account
                setSignupError(true);
                setErrorText(e.toString())
                // alert("Error!" + e)
            }
        }

        //stops loading page to block spam attacks
        setLoading(false);
    }

    return (
        <>
            <h1>Sign Up</h1>
            {
            signupError && 
                <>
                    <div className='signupError'><p className='errorText'>{errorText}</p></div>
                </>
             }
            <div>

                {/*this creates new text field with autofocus to place user here also handeles ref to pass to signup function */}
                <input autoFocus className='signInFields' ref={emailRef} onKeyPress={ handleKeyPress } placeholder="Email" /><br/>
                {/*confimation email field*/}
                <input className='signInFields' ref={emailConfirmRef} onKeyPress={ handleKeyPress } placeholder="Confirm Email" /><br/>

                {/*secured password fields that generates ref for singup function*/}
                <input className='signInFields' ref={passwordRef} onKeyPress={ handleKeyPress } type="password" placeholder="Password" /><br/>
                <input className='signInFields' ref={passwordConfirmRef} onKeyPress={ handleKeyPress } type="password" placeholder="Confirm Password" /><br/>
            </div>

            {/*button handles signup function*/}
            <Button disable={loading} buttonStyle="btn--primary--outline" onClick={handleSignup}>Sign Up</Button>

        </>
    );
}

export default Signup;