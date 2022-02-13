import './Button.css'
import React from "react"


const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  text
}) => {
  return (
    <button className="icon-button"onClick ={onClick} type={type}>
      
      <p>{children}</p>
    </button> 
  )
}

export default Button