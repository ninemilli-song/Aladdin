import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { SubstateProvider } from 'use-substate';

import configureStore from './store/configure-store';
import initIconFont from './common/init';

// Global styles
import './styles';

initIconFont();

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
import defaultRoutes from './pages';
const routes = defaultRoutes(store);

console.log('Login success! The user info is 👉🏻 ------> ');
ReactDOM.render(
    <SubstateProvider value={store}>
        <Provider store={ store }>
            <Router history={ history }>
            { routes }
            </Router>
        </Provider>
    </SubstateProvider>,
    document.getElementById('root')
);
