/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import Button from '../button';
import './delete-confirm.css';


const DeleteConfirm = ({ onAccept, onReject }) => {
  return(
    <div className="confirm">
          
      <div className="confirm-question">
       
      <p>Are you sure to delete this article?</p>
      </div>
<div className="button-group">
<Button label="No" onClick={onReject} isFocused={false}  />
<Button label="Yes" onClick={onAccept} isFocused={true}  />
</div>

  </div>
  )
}

export default DeleteConfirm;