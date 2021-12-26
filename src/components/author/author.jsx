/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { format } from 'date-fns';
import './author.css';



const Author = ({author, createdAt}) => {
  const {username, image} = author;

  // eslint-disable-next-line no-unused-vars
  const formattedDate = (date) => {
    try {
      const dateObject = new Date(createdAt);
      return format(dateObject, 'MMMM d, yyyy');
    } catch (error) {
      return '';
    }
  };
 
  return(
    <div className="author">
    <div className="info">
      <div className="name">{username}</div>
     <div>{formattedDate(createdAt)}</div>
    </div>
    <img alt="author" src={image} className="picture"></img>
  </div>
  )
}

export default Author;