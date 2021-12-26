/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Checkbox } from "@material-ui/core";
import FormField from '../form-field';
import BlogApi from '../../services/blog-api';
import { SignContext } from '../signContext';

import "./sign-up.css";

const api = new BlogApi();

const SignUp = function() {

  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;

  const { register, handleSubmit, formState:{errors}, getValues, control } = useForm();

  const [error, setError] = useState(null); 

 
  if (user) {
    return <Redirect to="/" />;
  }
        const onSubmit = async (userData) => {
          let user = {};
          try {
            const result = await api.signUp({ user: userData });
            if (result.errors) {
              if (result.errors.email) {
                setError(`${result.errors.email}`);
              }
              if (result.errors.username) {
                setError(`${result.errors.username}`);
              }
            } else {
              setError(null);
              user = await result.user;
              window.localStorage.setItem('user', JSON.stringify(user));
              setUser(user);
            }

          } catch (err) {
            setError(err);
         
          }
        };



return(
<form className="signup-block" onSubmit={handleSubmit(onSubmit)}>
<h3>Create new account</h3>

<FormField
label="Username"
type="username" 
placeholder="Username"
register={register}
validation = {{required: true,  minLength: 3,
  maxLength: 20}}
name="username" 
error={errors.username}/>


{errors.username && errors.username.type === 'minLength' && 
<p>Your password needs to be at least 3 characters!</p>}

{errors.username && errors.username.type === 'maxLength' && <p>Your password needs to be not more than 20 characters!</p>}


<FormField label="Email address"
placeholder="Email address"
register={register}
validation = {{required: true }}
name="email"
type="email"
error={errors.email}/>


<FormField
type="password"
name="password"
label="Password"
placeholder="Password"
register={register}
validation = {{required: true, minLength: 6,
  maxLength: 40 }}
error={errors.password}/>


<FormField
type="password"
label="Repeat Password"
placeholder="Password"
register={register}
validation = {{required: true, validate: (value) => value === getValues('password')}}
name="repeatpassword"
error={errors.repeatpassword}/>

<label>
<Controller
render={({ field }) => (
<Checkbox  style ={{
color: "#1890FF"
  }}
color="primary"
onChange={(e) => field.onChange(e.target.checked)}
checked = {field.value}
/>
)}
name="Checkbox"
defaultValue={false}
control={control}
rules={{ validate: (checked) => checked === true }}/>
I agree to the processing of my personal information
</label>


<input className="btn-submit"  type="submit" value="Create" />

<p className="haveAccount">
Already have an account?
<Link to="/sign-in">  Sign In  </Link>
</p>

            
</form>
);

}




export default SignUp;