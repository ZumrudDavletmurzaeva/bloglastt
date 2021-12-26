/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import './form-textarea.css';


function FormTextarea({ label, placeholder, register, name, defaultValue,validation }) {
  /* eslint-disable-next-line no-console */
  console.log('in FormFieldTextarea: defaultValue', defaultValue);
  return (
    <label className="label">
      {label}
      <textarea className="textarea"
        placeholder={placeholder}
        type="text"
        {...register(name, validation)}
        name={name}
        defaultValue={defaultValue}
       />
    </label>
  );
}

export default FormTextarea;