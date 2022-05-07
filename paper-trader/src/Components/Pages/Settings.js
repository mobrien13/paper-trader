import React, { useState } from 'react';
import './Settings.css';
import './Pages.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { updateUserEmail, updateUserPassword } from '../../firebase';



function Settings() {
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(true);


    const [email, setEmail] = useState("")
    const [secondEmail, setSecondEmail] = useState("")
    const [emailSuccess, setEmailSuccess] = useState(null)
    async function handleEmailUpdate() {

        if (email === secondEmail) {
            await updateUserEmail(email).then( (result)=> { 
                if (result) { 
                    setEmailSuccess(true)
                }
            })
        } else { 
            setEmailSuccess(false)
        }
    }


    const [password, setPassword] = useState("")
    const [secondPass, setSecondPass] = useState("")
    const [passSuccess, setPassSuccess] = useState("")



    return (
        <div className='container'>
            <h1>Settings</h1>

            {personalInfo &&
                <>
                    <h2>Account Security</h2>

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
                            }
                            }>Update Email</Button>
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
                            <input className='signInFields' placeholder="Current Password" type='password' />
                            <br />
                            <input className='signInFields' placeholder="New Password" type='password' />
                            <br />
                            <input className='signInFields' placeholder="Confirm New Password" type='password' />
                            <Button buttonStyle='btn--primary--outline'>Change Password</Button>
                        </>
                    }
                </>
            }

            <Link to='/test'><Button>Run Tests</Button></Link>

        </div>
    );
}


export default Settings;