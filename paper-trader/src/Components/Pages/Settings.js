import React, { useState } from 'react';
import './Settings.css';
import './Pages.css';
import Button from '../Button/Button';
import { User, usersDatabase } from '../../fakeDatabase.js';

function Settings() {
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [changeFunds, setChangeFunds] = useState(false);

    const [personalInfo, setPersonalInfo] = useState(true);
    const [funds, setFunds] = useState(true);

    //fake database
    const email = usersDatabase[0].email;
    const currentFunds = usersDatabase[0].funds;

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
                            <p>Current Email: {email}</p>

                            <input className='signInFields' placeholder="New Email" />
                            <br />
                            <input className='signInFields' placeholder="Confirm New Email" />
                            <Button buttonStyle='btn--primary--outline'>Update Email</Button>
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

            {funds &&
                <>
                    <h2>Funds</h2>
                    <h3>Add or Remove Funds</h3>
                    <p>Current Funds: {currentFunds}</p>
                    <input className='signInFields' placeholder="Add Funds" />
                    <Button buttonStyle='btn--primary--outline'>Add Funds</Button>
                </>
            }
        </div>
    );
}


export default Settings;