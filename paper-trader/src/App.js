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
          //ternery operator if a user is signed in, if user is signed in it shows these buttons
          currentUser &&
          <>
            <Link className="link-margin" to='dashboard'><Button buttonStyle='btn--nav' text="Dashboard">Dashboard</Button></Link>
            <Link className="link-margin" to='settings'><Button buttonStyle='btn--nav' text="Settings" >Settings</Button></Link>
            <Link className="link-margin" to=''><Button buttonStyle='btn--nav' onClick={handleLogout} text="Log Out" >Log Out</Button></Link>
          </>
        }

        {
          //ternery operator if user is not signed in and displays these buttons
          !currentUser &&
          <>
            <Link className="link-margin" to><Button buttonStyle="btn--login" onClick={() => { modalRef.current.open(); setModal("login") }}>Log In</Button></Link>
            <Link className="link-margin" to><Button buttonStyle="btn--signup" onClick={() => { modalRef.current.open(); setModal("signup") }}>Sign Up</Button></Link>
          </>
        }
      </Navbar>

      {/*Views is the container for all site content.*/}
      <Views style={{ flex: 1 }} />


      {/*Displays modal component if and only if the corresponding button is clicked*/}
      <Modal ref={modalRef}>
        {modal === "login" && <Login closeModal={() => modalRef.current.close()} />}
        {modal === "signup" && <Signup closeModal={() => modalRef.current.close()} />}
      </Modal>

    </BrowserRouter>
  );
}


async function handleLogout() {
  logout()
}

export default App;
