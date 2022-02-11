import './Navbar.css';
import logo from '../../icons/logo.svg';

function Navbar(props){
    return(
      <nav className = "navbar">
        <a href="home"><img className="logo" src={logo}/></a>
        <ul className = "navbar-buttons"> { props.children } </ul>
        <ul className="navbar-links">
        </ul>
      </nav>
    );
  }
  
  export default Navbar;