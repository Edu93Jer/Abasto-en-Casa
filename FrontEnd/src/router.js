import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute'
import NavMenu from './components/Menu';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Terms from './pages/Terms';
import CreateProduct from './pages/CreateProduct'
import Department from './pages/DepartmentView'
import FAQ from './pages/FAQ';
import Mailbox from './pages/Contact';

const AppRouter = () => (
  <Router>
    <NavMenu>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Profile} path="/profile" />
        <PrivateRoute exact component={Cart} path="/cart" />
        <PrivateRoute exact component={Orders} path="/orders" />
        <AdminRoute exact component={CreateProduct} path="/product/create" />
        <Route component={Department} path="/product/department/" />
        <Route exact component={Terms} path="/terms" />
        <Route exact component={FAQ} path="/faq" />
        <Route exact component={Mailbox} path="/contact" />
      </Switch>
    </NavMenu>
  </Router>
);

export default AppRouter;
