import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import request from '../utils/fetch';

import configureStore from '../store/configure-store';

import Signin from '../pages/signin';
import '../styles';

const store = configureStore({});

ReactDOM.render(
    <Provider store={ store }>
        <Signin store={ store } />
    </Provider>,
    document.getElementById('root')
);
