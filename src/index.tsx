// import 'es5-shim';
// import 'es6-shim';
// import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import 'whatwg-fetch';
import request from './utils/fetch';

import configureStore from './store/configure-store';

// Global styles
// import 'antd/dist/antd.css';
import './styles';
// import './styles/index.scss';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
import defaultRoutes from './routes';
const routes = defaultRoutes(store);

request.get('http://localhost:3001/users/login', {
  name: 'alice',
  password: 'x'
}).then((loginRes) => {
  console.log('Login success! The user info is 👉🏻 ------> ', loginRes);
  ReactDOM.render(
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}).catch((error) => {
  ReactDOM.render(
    <div>
      {error}
    </div>,
    document.getElementById('root')
  );
});


