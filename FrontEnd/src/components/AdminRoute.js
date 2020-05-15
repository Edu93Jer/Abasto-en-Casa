import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MyContext } from '../context/context';

const AdminRoute = ({ component: Component, ...rest }) => (
  <MyContext.Consumer>
    {({ loggedUser }) => (
      <Route
        {...rest}
        render={props => ( loggedUser.rol === 'admin' ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    )}
  </MyContext.Consumer>
);



export default AdminRoute;
