import React from 'react';
import {createBrowserHistory} from 'history';
import {render} from 'react-dom';
import Root from './components/Root';
import createStore from './create-store';

const history = createBrowserHistory();
const store = createStore(history, window.__data);

render(<Root store={store} history={history} />, document.getElementById('root'));
