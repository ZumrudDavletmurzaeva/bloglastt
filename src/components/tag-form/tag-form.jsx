/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import FormField from '../form-field';



import './tag-form.css';

const TagForm = ({ onAdd, onDelete, register,tagId, tag, setTag, needAddTag }) => {

  const addTagButton = needAddTag ? (
    <input type="button" className="infoadd" onClick={onAdd} value="Add tag"/>
  ) : null;


  return (
    <li className="new-tag-form">
      <FormField
        placeholder="Tag"
        register={register}
        name={`${tagId}`}
        value={tag}
        onChange={(event) => {
          setTag(tagId, event.target.value);
        }}
      />
      <input type="button" className="highlightt" onClick={() => onDelete(tagId)} value="Delete"/>
    
      {addTagButton}
    </li>
  );
};

export default TagForm;