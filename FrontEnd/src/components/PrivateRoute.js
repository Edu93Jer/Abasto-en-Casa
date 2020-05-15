import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MyContext } from '../context/context';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <MyContext.Consumer>
    {({ loggedUser }) => (
      <Route
        {...rest}
        render={props => (loggedUser ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    )}
  </MyContext.Consumer>
);

export default PrivateRoute;
