/**
 * Root Component
 */
import React from 'react';
import propTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// import ConnectedRouter from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';
// import IntlWrapper from './modules/Intl/IntlWrapper';

// Import Routes
import routes from './routes';
// const history = createHistory();
// Base stylesheet
require('./main.css');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
      {/* <ConnectedRouter history={browserHistory}> */}
        {routes}
      {/* </ ConnectedRouter> */}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired,
};
