import React, { useState } from 'react';
import './Settings.css';
import './Pages.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { updateUserEmail, updateUserPassword, updateUsername } from '../../firebase';



function Settings() {
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(true);


    const [email, setEmail] = useState("")
    const [secondEmail, setSecondEmail] = useState("")
    const [emailSuccess, setEmailSuccess] = useState(null)
    function handleEmailUpdate() {

        if (email === secondEmail) {
            updateUserEmail(email).then((result) => {
                if (result) {
                    setEmailSuccess(true)
                }
            })
        } else {
            setEmailSuccess(false)
        }
    }


    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const [passSuccess, setPassSuccess] = useState(null)
    function handlePasswordUpdate() {

        if (password === secondPassword) {
            updateUserPassword(password).then((result) => {
                if (result) {
                    setPassSuccess(true)
                }
            })
        } else {
            setPassSuccess(false)
        }
    }

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [nameSuccess, setNamesucceess] = useState(null)
    function handleNameChange() {
        if ((firstname && lastname) !== "") {
            updateUsername(firstname, lastname).then((result) => {
                if (result) {
                    setNamesucceess(true)
                } else {
                    setNamesucceess(false)
                }
            })
        } else {
            setNamesucceess(false)
        }
    }



    return (
        <div className='container'>

            <h1>Settings</h1>

            {personalInfo &&
                <>
                    <h2>Account Security</h2>


                    <div onClick={() => setChangeName(!changeName)} className='settingsIcons' >
                        <h3>Change Username</h3>
                        {!changeEmail &&
                            <i className="fa fa-plus-circle iconBlack" aria-hidden="true"></i>
                        }
                        {changeEmail &&
                            <i className="fa fa-minus-circle iconBlack" aria-hidden="true"></i>
                        }
                    </div>

                    {changeName &&
                        <>
                            <p>Current name: { }</p>
                            {nameSuccess !== null && nameSuccess && <p className='orderSuccess'>Username Updated</p>}
                            {nameSuccess !== null && !nameSuccess && <p className='orderNotSuccess'>Username not Updated</p>}
                            <input className='signInFields' placeholder="Firstname" onChange={event => setFirstname(event.target.value)} />
                            <br />
                            <input className='signInFields' placeholder="Lastname" onChange={event => setLastname(event.target.value)} />

                            <Button buttonStyle='btn--primary--outline' onClick={() => {
                                handleNameChange()
                            }}>Update Username</Button>
                        </>
                    }


                    <div onClick={() => setChangeEmail(!changeEmail)} className='settingsIcons' >
                        <h3>Change Email</h3>
                        {!changeEmail &&
                            <i className="fa fa-plus-circle iconBlack" aria-hidden="true"></i>
                        }
                        {changeEmail &&
                            <i className="fa fa-minus-circle iconBlack" aria-hidden="true"></i>
                        }
                    </div>

                    {changeEmail &&
                        <>
                            <p>Current Email: { }</p>
                            {emailSuccess !== null && emailSuccess && <p className='orderSuccess'>Email updated</p>}
                            {emailSuccess !== null && !emailSuccess && <p className='orderNotSuccess'>Email not updated</p>}
                            <input className='signInFields' placeholder="New Email" onChange={event => setEmail(event.target.value)} />
                            <br />
                            <input className='signInFields' placeholder="Confirm New Email" onChange={event => setSecondEmail(event.target.value)} />

                            <Button buttonStyle='btn--primary--outline' onClick={() => {
                                handleEmailUpdate()
                            }}>Update Email</Button>
                        </>
                    }

                    <div onClick={() => setChangePass(!changePass)} className='settingsIcons' >
                        <h3>Change Password</h3>
                        {!changePass &&
                            <i className="fa fa-plus-circle iconBlack" aria-hidden="true"></i>
                        }
                        {changePass &&
                            <i className="fa fa-minus-circle iconBlack" aria-hidden="true"></i>
                        }
                    </div>

                    {changePass &&
                        <>
                            {passSuccess !== null && passSuccess && <p className='orderSuccess'>Password Updated</p>}
                            {passSuccess !== null && !passSuccess && <p className='orderNotSuccess'>Password not Updated</p>}
                            <input className='signInFields' placeholder="New Password" type='password' onChange={event => setPassword(event.target.value)} />
                            <br />
                            <input className='signInFields' placeholder="Confirm New Password" type='password' onChange={event => setSecondPassword(event.target.value)} />
                            <Button buttonStyle='btn--primary--outline' onClick={() => {
                                handlePasswordUpdate()
                            }}>Change Password</Button>
                        </>
                    }
                </>
            }

            <Link to='/test'><Button>Run Tests</Button></Link>

        </div>
    );
}


export default Settings;