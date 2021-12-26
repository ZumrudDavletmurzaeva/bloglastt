/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, {useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Redirect,Link } from 'react-router-dom';
import FormField from '../form-field';
import BlogApi from '../../services/blog-api';
import { SignContext } from '../signContext';
import './sign-in.css';


const api = new BlogApi();

const SignIn = function() {

  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;
  
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [error, setError] = useState(null);



  if (user) {
    return <Redirect to="/" />;
  }
        const onSubmit = async (userData) => {
          let userToPath = {};
          try {
            const result = await api.signIn({ user: userData });
            if (result.errors) {
                setError(result.errors);
              }
             else {
              setError(null);
              userToPath = await result.user;
              window.localStorage.setItem('user', JSON.stringify(userToPath));
              setUser(userToPath);
            }
          } catch (err) {
            setError(err);
          }
        };

  


return(
<form className="signin-block" onSubmit={handleSubmit(onSubmit)}>

<h3>Sign In</h3>


<FormField
name="email" type="email"
label="Email address"
placeholder="Email address"
register={register}
validation = {{required: true }}
error={errors.email}/>

<FormField
type="password" name="password"
label="Password"
placeholder="Password"
register = {register}
validation = {{required: true }}
error={errors.password} />

<input className="btn-submit"  type="submit" value="Login" />


<p className="haveAccount">
Don’t have an account?
<Link to="/sign-up">  Sign up  </Link>
</p>
</form>
)

  
}

export default SignIn;