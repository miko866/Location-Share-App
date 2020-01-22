import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AuthenticationController from './AuthenticationController.js';

// Auth Router link for Logged User
export default class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationController.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Route to="/login" />;
    }
  }
}
