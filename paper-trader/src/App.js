import React, { useState } from 'react'
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';
import Views from './Components/Views/Views';
import {BrowserRouter, Link} from 'react-router-dom';
import Modal from './Components/Modal/Modal';


function App() {
  const [modalActive, setModalActive] = useState(false); 
  
  return (
  <BrowserRouter>
    <Navbar>
      {/*When using the Link tag, be sure to replace the 'to' prop 
      with the onClick prop in order to show the login and signup 
      modals*/}
      <Link className="link-margin" to='dashboard'><Button text = "Dashboard">Dashboard</Button></Link>
      <Link className="link-margin" to='settings'><Button text = "Settings" >Settings</Button></Link>
      <Link className="link-margin" to><Button onClick={()=> setModalActive(true)}>Log In</Button></Link>
      <Link className="link-margin" to><Button onClick={()=> setModalActive(true)}>Sign Up</Button></Link>
      
    </Navbar>

    {/*Views is the container for all site content.
    The container div gives the Views a 10% padding 
    on the left and right sides*/}
    <div className='container'>
      <Views style={{ flex:1 }}/>
    </div>

  {modalActive && <Modal></Modal>}

  </BrowserRouter>
  );
}

export default App;
