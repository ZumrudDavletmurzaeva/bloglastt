/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, {useContext}from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../form-field';
import BlogApi from '../../services/blog-api';
import './profile.css';

import { SignContext } from '../signContext';

const api = new BlogApi();

const Profile = function() {

  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;

  const { register, handleSubmit, formState:{errors} } = useForm();


  const onSubmit = async (userData) => {
    const { token } = user;
    const { image, username,password, email } = userData;
    const userNew = {image,username,password, email}

  const result =  await api.updateUser(token, { user: userNew });
  const newUser = await result.user;
  window.localStorage.setItem('user', JSON.stringify(newUser));
  setUser(newUser);
};

const { username, image, email } = user;


return (
<form className="form"  onSubmit={handleSubmit(onSubmit)}>
<h4>Edit Profile</h4>

<FormField
label="Username"
placeholder="Username"
type="username"
register={register}
validation = {{minLength: 3,
  maxLength: 20}}
name="username"
defaultValue={username}
error={errors.username}
/>

{errors.username && errors.username.type === 'minLength' && 
<p>Your password needs to be at least 3 characters!</p>}

{errors.username && errors.username.type === 'maxLength' && <p>Your password needs to be not more than 20 characters!</p>}

<FormField
name="email"
type="email"
label="Email address"
placeholder="Email address"
register={register}
defaultValue={email}
error={errors.email}/>
            


<FormField
name="password"
type="password"
label="New password"
placeholder="New password"
register={register}
validation = {{minLength: 6,
  maxLength: 40 }}
error={errors.password}
/>


{errors.password && errors.password.type === 'minLength' && 
<p>Your password needs to be at least 6 characters!</p>}

{errors.password && errors.password.type === 'maxLength' && <p>Your password needs to be not more than 40 characters!</p>}


<FormField
name="image"
type="url"
label="Avatar image (url)"
placeholder="Avatar image"
register={register}
defaultValue={image}
error={errors.image}/>

<input className="btn-submit"  type="submit" value="Save" />
</form>


)
}

export default Profile;