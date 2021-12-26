/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import './favorite.css';

function Favorite({ onClick, disabled, isFavorited }) {
  const base = 'btn-heart';
  let classes = `${base}`;
  classes += isFavorited ? ` ${base}--favorited` : '';
  return <input type="button" className={classes} disabled={disabled} onClick={onClick} />;
}

export default Favorite;