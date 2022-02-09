import React from 'react';
import logo from './icons/logo.svg';

function App() {
  return (
    <Navbar></Navbar>
  );
}

function Navbar(){
  return(
    <nav className = "navbar">
      <ul className = "navbar-nav">
      <img className="logo" src={logo}/>
      </ul>
    </nav>
  );
}

export default App;
