/* eslint-disable react/prop-types */

import React from 'react'
import './tag.css';

// eslint-disable-next-line func-names
const Tag = function({ tag }) {
  return (
  <div className="tag">{tag}</div>
  );
}

export default Tag;