import React from 'react';
import {Router, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Login from './App/Login';
import Home from './App/Home';
import NoAuthRoute from './components/NoAuthRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';

export default ({history}) => (
  <Router history={history}>
    <App>
      <Switch>
        <NoAuthRoute exact path="/login" component={Login} />
        <AuthenticatedRoute exact path="/" component={Home} />
        <Redirect from="*" to="/" />
      </Switch>
    </App>
  </Router>
);
