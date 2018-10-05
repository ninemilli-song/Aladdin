import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import request from '../utils/fetch';

import configureStore from '../store/configure-store';

import signinRoute from '../routes/signin';
import '../styles';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
        { signinRoute(store) }
        </Router>
    </Provider>,
    document.getElementById('root')
);
