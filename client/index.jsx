import React from 'react';
import {createBrowserHistory} from 'history';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'mobx-react-router';
import Root from './components/Root';
import {createStore} from './stores';

const browserHistory = createBrowserHistory();
const store = createStore(window.__data);
const history = syncHistoryWithStore(browserHistory, store.routing);

render(<Root store={store} history={history} />, document.getElementById('root'));
