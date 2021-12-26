/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import './form-filed.css';

const FormField = ( {label,
  placeholder,
  register,
  name,
  validation,
  defaultValue,
  error,
  onChange,
  type = 'text'}) => {



  return(
    <>
       {error && <span>This field is required!</span>}
    <label className="label">
      {label}
      <input className="input"
        placeholder={placeholder}
        type={type}
        {...register(name, validation)}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
      />
    </label>
    </>
  )
}

export default FormField;