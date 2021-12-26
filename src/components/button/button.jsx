/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';

import './button.css';


const Button = ({label, isFocused = false, onClick}) => {

const  buttonActiv = isFocused ? "button--focus" : "button";
  return(
    <input
    type="button"
    className={buttonActiv}
    value={label}
    onClick={onClick}
    autoFocus={isFocused}
  />
  )
}

export default Button;