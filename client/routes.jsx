import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';

export default ({history}) => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={App} />>
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  </Router>
);