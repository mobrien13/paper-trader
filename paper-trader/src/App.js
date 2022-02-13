import React from 'react';
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';
import Views from './Components/Views/Views';
import {BrowserRouter, Link} from 'react-router-dom';
import Modal from './Components/Modal/Modal';

function openModal(){
  return (
    <Modal></Modal>
  )

}

function App() { 
  return (
  <BrowserRouter>
    <Navbar>
      {/*When using the Link tag, be sure to replace the 'to' prop 
      with the onClick prop in order to show the login and signup 
      modals*/}
      <Link to='dashboard' className='nav-link'><Button text = "Dashboard" /></Link>
      <Link to='settings' className='nav-link'><Button text = "Settings" /></Link>
      <Button text = "Log In" />
      <Button  text = "Sign Up" />
      
    </Navbar>

    {/*Views is the container for all site content.
    The container div gives the Views a 10% padding 
    on the left and right sides*/}
    <div className='container'>
      <Views style={{ flex:1 }}/>
    </div>

  </BrowserRouter>
  );
}

export default App;
