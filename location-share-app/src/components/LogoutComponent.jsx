import React, { Component } from 'react';

// Custom CSS
import '../assets/css/components/logout-component.css';

export default class LogoutComponent extends Component {
  constructor(props) {
    super(props);

    // Than redirect to Dashboard
    window.setTimeout(() => {
      this.props.history.push('/');
    }, 3000);
  }

  render() {
    return (
      <div className="logout-component">
        <h1>You are logged out</h1>
        <div className="container">
          <p>Thank you for using me App</p>
        </div>
      </div>
    );
  }
}
