import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Login from './App/Login';
import Home from './App/Home';

export default ({history}) => (
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Redirect from="*" to="/" />
      </Switch>
    </App>
  </Router>
);
