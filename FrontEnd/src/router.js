import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavMenu from './components/Menu';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

const AppRouter = () => (
  <Router>
    <NavMenu>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Profile} path="/profile" />
        <Route exact component={Cart} path="/cart" />
        <Route exact component={Orders} path="/orders" />
      </Switch>
    </NavMenu>
  </Router>
);

export default AppRouter;
