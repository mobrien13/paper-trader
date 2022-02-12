import './Button.css'

function Button(props){
    return(
      <li className="button">
        <p className="icon-button">
          <span>{props.text}</span>
        </p>
      </li>
  
    );
  }

  export default Button