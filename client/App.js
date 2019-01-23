/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

/**
 * @description App component
 *
 * @class App
 *
 * @namespace Component
 *
 * @extends Component
 */
class App extends Component {
  /**
     * @method render
     * @member App
     * @param {*} Empty
     * @returns {object} object
     */
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" exact render={() => <h1>Welcome to React</h1>} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
