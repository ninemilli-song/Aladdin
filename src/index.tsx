// import 'es5-shim';
// import 'es6-shim';
// import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import 'whatwg-fetch';
import request from './utils/fetch';

import configureStore from './store/configure-store';

import signinRoute from './routes/signin';

// Global styles
import './styles';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
import defaultRoutes from './routes';
const routes = defaultRoutes(store);

console.log('Login success! The user info is 👉🏻 ------> ');
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
        { routes }
        </Router>
    </Provider>,
    document.getElementById('root')
);