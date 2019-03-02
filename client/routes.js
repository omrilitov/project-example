import React from 'react';
import {Route, Redirect} from 'react-router';
import {ConnectedRouter} from 'connected-react-router'
import App from './App';

export default ({history}) => (
  <ConnectedRouter history={history}>
    <Route path='/' component={App}>
      <Redirect from='*' to='/' />
    </Route>
  </ConnectedRouter>
);