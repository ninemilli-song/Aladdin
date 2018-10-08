import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import request from '../utils/fetch';

import configureStore from '../store/configure-store';

import View from '../pages/accounting-home';
import '../styles';

const store = configureStore({});

ReactDOM.render(
    <Provider store={ store }>
        <View store={ store } />
    </Provider>,
    document.getElementById('root')
);
