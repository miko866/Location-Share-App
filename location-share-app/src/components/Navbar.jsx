import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/components/navbar.css';
import AuthenticationController from '../controllers/AuthenticationController';

class Navbar extends Component {
  state = {
    user: '',
  };

  // If user is logged set the name into state
  componentDidMount() {
    let user = sessionStorage.getItem('userName');
    if (user !== '') {
      this.setState({ user: user });
    }
  }

  render() {
    // Variable with Auth method
    // Check if user is logged in
    const isUserLoggedIn = AuthenticationController.isUserLoggedIn();

    const userId = sessionStorage.getItem('userId');

    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div>
              <Link to="/" className="navbar-brand text-white">
                Share Yours Place
              </Link>
            </div>
            {/* START Mobile menu */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* END Mobile menu */}

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/users" className="nav-link text-white pr-3">
                    All Users
                  </Link>
                </li>

                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link to="/newPost" className="nav-link text-white pr-3">
                      Create Location
                    </Link>
                  </li>
                )}

                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link to={`/user/${userId}`} className="nav-link text-white pr-3">
                      {this.state.user}
                    </Link>
                  </li>
                )}

                {!isUserLoggedIn && (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white pr-3">
                      Login
                    </Link>
                  </li>
                )}

                {!isUserLoggedIn && (
                  <li className="nav-item">
                    <Link to="/singin" className="nav-link text-white pr-3">
                      Sing in
                    </Link>
                  </li>
                )}

                {isUserLoggedIn && (
                  <li className="nav-item">
                    <Link
                      to="/logout"
                      className="nav-link  text-white"
                      onClick={AuthenticationController.logout}>
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Navbar;
