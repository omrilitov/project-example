import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Provider} from 'mobx-react';
import Router from '../routes';

const Root = ({store, history}) => (
  <Provider {...store}>
    <Router history={history} />
  </Provider>
);

export default hot(Root);
