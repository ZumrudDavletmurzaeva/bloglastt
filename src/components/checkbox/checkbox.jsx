/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';

import './checkbox.css';

const Checkbox = ({ isChecked, caption, onChange }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox-input"
        value=""
        onChange={onChange}
        checked={isChecked}
      />
      <span className="checkbox-custom"></span>
      <span>{caption}</span>
    </label>
  );
};

export default Checkbox;