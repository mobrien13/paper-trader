import './Button.css'

function Button(props){
    return(
      <li className="button">
        <a href="#" className="icon-button">
          <span id='innermost'>{props.text}</span>
        </a>
      </li>
  
    );
  }

  export default Button