import { React, useState } from 'react';
import './Navbar.css';
import logo from '../../icons/logo.svg';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button.js';

function Navbar(props) {

  //mobile menu open/setOpen
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to='/'><img className="logo" src={logo} /></Link>
        <ul className="navbar-buttons"> {props.children} </ul>
        <ul className="navbar-links">
        </ul>
      </nav>


      <nav className='mobileNav'>
        <div className='mobileTopBar'>
          <Link to='/'><img className="logo" src={logo} /></Link>
          <button id='hamburger' onClick={ () => setOpen(!open) }><i className='fa fa-bars'></i></button>
        </div>
        <ul className='navbar-buttons'>
          {open &&
            <div className='openMobileNav'>
              <br /><br /><br /><br /><br />
              {props.children}
            </div>
          }
        </ul>
      </nav>
    </>
  );
}

export default Navbar;