import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducer';

export default (history, initialState = {}) => {
  const params = [
    applyMiddleware(
      routerMiddleware(history)
    )
  ];

  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./components/DevTools').default;
    const {persistState} = require('redux-devtools');

    params.push(
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    );
  }

  return createStore(
    createRootReducer(history),
    initialState,
    compose(...params)
  );
};
