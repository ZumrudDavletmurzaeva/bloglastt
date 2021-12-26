/* eslint-disable react/function-component-definition */
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import User from '../user';
import './header.css';

import { SignContext } from '../signContext';

const Header = () => {

  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;


  const logOut = () => {
    window.localStorage.setItem('user', '');
    setUser('');
  };


  const headerLinks = !user ? (
    <div className="user-log">
      <Link className="link signin" to="/sign-in">Sign In</Link>
     
       
      <Link className="link signup"
        to="/sign-up" >Sign up</Link>
      
    </div>
  ) : (
    <div className="user-log">
        <Link  className= "create-article" to="/create-article">Create Article</Link>

      <Link to="/profile"  className="link">
        <User {...user} />
      </Link>

      <input type="button" className="logout" onClick={logOut} value= "Log Out" />
    </div>
  );





  return(

    <header className="blog-header">

      <Link className="heading" to="/">Realworld Blog </Link>
    
     {headerLinks}
   
    </header>
  )
}

export default Header;