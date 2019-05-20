import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import App from './App';

export default ({history}) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <Redirect from='*' to='/' />
    </Route>
  </Router>
);