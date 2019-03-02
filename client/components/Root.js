import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Provider} from 'react-redux';
import Router from '../routes';

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history} />
  </Provider>
);

export default hot(Root);
