import React from 'react';
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';
import Views from './Components/Views/Views';
import {BrowserRouter, Link} from 'react-router-dom';
import Modal from './Components/Modal/Modal';

function App() {
  return (
  <BrowserRouter>
    <Navbar>
      {/*When using the Link tag, be sure to replace the 'to' prop with the onClick prop in order to show the login and signup modals*/}
      <Link to='dashboard' className='nav-link'><Button text = "Dashboard" /></Link>
      <Link to='settings' className='nav-link'><Button text = "Settings" /></Link>
      <Link to='login' className='nav-link'><Button text = "Log In" /></Link>
      <Link to='signup' className='nav-link'><Button text = "Sign Up" /></Link>
    </Navbar>

    {/*Views is the container for all site content.
    The container div gives the Views a 10% padding on the left and right sides*/}
    <div className='container'>
      <Views style={{ flex:1 }}/>
    </div>

    <Modal></Modal>
  </BrowserRouter>
  );
}


export default App;
