/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import './form-text.css';

const FormText = ( {label,
  placeholder,
  register,
  name,
  validation,
  defaultValue,
  error,
  onChange,
  type = 'text'}) => (
    <>
       {error && <span>This field is required!</span>}
    <label className="label">
      {label}
      <input className="input-text"
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

export default FormText;