import './Button.css'
import React from "react"


//array for styles, see button.css
const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--login",
  "btn--signup",
  "btn--nav"
]

//array lost for sizes, see button.css
const SIZES = [
  "btn--medium", 
  "btn--small"
]

//creats button contructor
const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {

  //checks button props with styles 
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  //checks button props with styles 
  const checkButtonSize = STYLES.includes(buttonSize)
    ? buttonSize
    : SIZES[0];

  //returns button object with associated props
    return (
    <li class = "buttons">
      <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
        {children}
      </button>
    </li>
  )
}

export default Button