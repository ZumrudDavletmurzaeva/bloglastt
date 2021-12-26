/* eslint-disable func-names */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = function({ component, path, exact = false, redirect = '/sign-in', condition }) {
  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={redirect} />
  );
}

export default PrivateRoute;