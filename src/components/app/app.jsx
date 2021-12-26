/* eslint-disable func-names */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */

import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import Header from '../header';
import ArticleList from '../article-list';
import Article from '../article';
import Profile from '../profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';
import BlogApi from '../../services/blog-api';
import CreateArticle from '../createarticle';
import PrivateRoute from '../private-route';

import { SignContext } from '../signContext';


import './app.css';
 
const api = new BlogApi();

const App = function() {

  const [user, setUser] = useState('');

  useEffect(() => {
    const userData = window.localStorage.getItem('user') 
    if (userData === '') {
      return;
    }

    const userJson = JSON.parse(userData);
    const { token } = userJson;

    const getauthorize = async (token) => {
      const result = await api.getCurrentUser(token);
      setUser(result.user);
    };

    getauthorize(token);
  }, []);


return (
  <SignContext.Provider value={{ user, setUser }}>
<div className="app">
<Router>
<Header />
<Switch>
<Route path="/sign-up" component={SignUp} />
<Route path="/sign-in" component={SignIn} />
<Route path="/" exact component={ArticleList} />
<Route path="/article"  exact component={ArticleList} />
<Route path="/articles/:slug" exact component={Article} />

<PrivateRoute path="/profile" exact redirect="/sign-in" component={Profile} condition={user}/>
<PrivateRoute path="/create-article" exact redirect="/sign-in"  component={CreateArticle} condition={user} />
<PrivateRoute path="/articles/:slug/edit" exact redirect="/sign-in"  component={CreateArticle} condition={user} />

</Switch>
</Router>

</div>
</SignContext.Provider>
)
}

export default App;