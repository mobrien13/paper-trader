import './Button.css'
import React from "react"

const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline"
]

const SIZES = ["btn--medium, btn--small"]

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = STYLES.includes(buttonSize)
    ? buttonSize
    : SIZES[0];

  return (
    <li>
      <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
        {children}
      </button>
    </li>
  )
}

export default Button