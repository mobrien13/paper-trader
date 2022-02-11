import React from 'react';
import logo from './icons/logo.svg';

function App() {
  return (
    <Navbar>
      <NavItem icon = "Log In" />
      <NavItem icon = "Sign Up" />
    </Navbar>
  );
}

function Navbar(props){
  return(
    <nav className = "navbar">
      <img className="logo" src={logo}/>
      <ul className = "navbar-buttons"> { props.children } </ul>
      <ul className="navbar-links">
      </ul>
    </nav>
  );
}

function NavItem(props){
  return(
    <li className="nav-item">
      <a href="#" className="icon-button">
        {props.icon}
      </a>

    </li>

  );
}
export default App;
