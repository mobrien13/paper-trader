import { React, useState, useImperativeHandle, forwardRef } from 'react';
import './Navbar.css';
import logo from '../../icons/logo.svg';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button.js';
import Search from '../Search/Search';
import { useAuth } from '../../firebase.js';

function Navbar(props) {

  //mobile menu open/setOpen
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to='/'><img className="logo" src={logo} /></Link>
        <ul className="navbar-buttons">
          {useAuth() != null && <Search />}
          {props.children} </ul>
        <ul className="navbar-links">
        </ul>
      </nav>


      <nav className='mobileNav'>
        <div className='mobileTopBar'>
          <ul className='mobileNavbarUl'>
            <span id='mobileLogo'><Link to='/'><img className="logo" src={logo} /></Link></span>
            <span id='mobileNavbarSearch'> {useAuth() != null && <Search />} </span>
            <button id='hamburger' onClick={() => setOpen(!open)}><i className='fa fa-bars'></i></button>
          </ul>
        </div>
        <ul className='navbar-buttons'>
          {open &&
            <div className='openMobileNav'>
              <br /><br /><br /><br /><br />
              <div className='openContents'>
                { props.children }
              </div>
            </div>
          }
        </ul>
      </nav>
    </>
  );
}

export default Navbar;