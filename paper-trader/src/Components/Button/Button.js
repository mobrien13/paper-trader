import './Button.css'

function Button(props){
    return(
      <li className="button">
        <a href="#" className="icon-button">
          {props.text}
        </a>
      </li>
  
    );
  }

  export default Button