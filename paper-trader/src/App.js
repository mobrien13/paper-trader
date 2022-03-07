import React, { useState, useRef } from 'react'
import Button from './Components/Button/Button';
import Navbar from './Components/Navbar/Navbar';
import Views from './Components/Views/Views';
import { BrowserRouter, Link } from 'react-router-dom';
import Modal from './Components/Modal/Modal';
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import Search from './Components/Search/Search';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { logout, useAuth } from './firebase'

function App() {
  const currentUser = useAuth();
  const modalRef = useRef();
  const [modal, setModal] = useState("");

  

  return (
    <BrowserRouter>
      <Navbar>
        {/*Navbar Items and Links*/}

        {
          currentUser && 
          <>
          <Link className="link-margin" to='dashboard'><Button text="Dashboard">Dashboard</Button></Link>
          <Link className="link-margin" to='settings'><Button text="Settings" >Settings</Button></Link>
          <Link className="link-margin" to=''><Button onClick={ handleLogout } text="Log Out" >Log Out</Button></Link>
          </>
        }

        {
          !currentUser &&
          <>
            <Link className="link-margin" to><Button onClick={() => { modalRef.current.open(); setModal("login") }}>Log In</Button></Link>
            <Link className="link-margin" to><Button onClick={() => { modalRef.current.open(); setModal("signup") }}>Sign Up</Button></Link>
          </>
        }
      </Navbar>

      {/*Views is the container for all site content.
    The container div gives the Views a 10% padding 
    on the left and right sides*/}
      <div className='container'>
        <Views style={{ flex: 1 }} />
      </div>


      {/*Displays modal component if and only if the corresponding button is clicked*/}
      <Modal ref={modalRef}>
        {modal === "login" && <Login />}
        {modal === "signup" && <Signup />}
      </Modal>

    </BrowserRouter>
  );
}


async function handleLogout() {
  logout()
}

export default App;
