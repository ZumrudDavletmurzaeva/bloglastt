/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
import React from 'react';

import './user.css';

// eslint-disable-next-line arrow-body-style
const User = ({ image, username }) => {
  return (
    <div className="user-log">
      <div className="info-log">
        <div className="name-log">{username}</div>
      </div>
      <img alt="user" src={image} className="picture-log"></img>
    </div>
  );
}
export default User;