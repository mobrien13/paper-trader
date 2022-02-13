import './Navbar.css';
import logo from '../../icons/logo.svg';
import {Link} from 'react-router-dom';

function Navbar(props){
    return(
      <nav className = "navbar">
        <Link to='/'><img className="logo" src={logo}/></Link>
        <ul className = "navbar-buttons"> { props.children } </ul>
        <ul className="navbar-links">
        </ul>
      </nav>
    );
  }
  
  export default Navbar;