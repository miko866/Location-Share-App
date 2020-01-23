import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Auth Components
import Login from './components/auth/LoginComponent';
import Logout from './components/auth/LogoutComponent';
import Singin from './components/auth/SinginComponent';
import ForgetPassword from './components/auth/ForgetPassword';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UsersCard from './components/UsersCard';
import CreateLocation from './components/CreateLocation';
import UserProfile from './components/UserProfile';
import MapLocation from './components/MapLocation';
import EditLocation from './components/EditLocation';
import LocationCardUserPosts from './components/LocationCardUserPosts';

// Security
import jwtDecode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './actions/types';
import AuthenticatedRoute from './controllers/AuthenticatedRoute';
import { logout } from './actions/securityActions';

// Custom CSS
import './assets/css/components/error-component.css';

const jwtToken = sessionStorage.jwtToken;

// If Token exits check also validation
if (jwtToken) {
  setJWTToken(jwtToken);
  const decodeJwtToken = jwtDecode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodeJwtToken,
  });

  // Exp Token -> Logout
  const currentTime = Date.now() / 1000;
  if (decodeJwtToken.exp < currentTime) {
    window.location.href = '/logout';
    store.dispatch(logout());
  }
}
function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/users" component={UsersCard} />
            <Route path="/login" component={Login} />
            <Route path="/singin" component={Singin} />
            <Route path="/resetPassword" component={ForgetPassword} />
            <Route path="/map" component={MapLocation} />
            {/* Only Auth users can see it */}
            <AuthenticatedRoute path="/logout" component={Logout} />
            <AuthenticatedRoute path="/newPost" component={CreateLocation} />
            <AuthenticatedRoute path="/editPost/:id" component={EditLocation} />
            <AuthenticatedRoute path="/user/posts" component={LocationCardUserPosts} />
            <AuthenticatedRoute path="/user/:id" component={UserProfile} />

            <Route component={ErrorComponent} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );

  // Route fullback
  function ErrorComponent() {
    return (
      <div className="error-component">
        <h1>You shall not pass!</h1>
        <Link className="btn btn-outline-danger mt-5" to="/">
          To Dashboard
        </Link>
      </div>
    );
  }
}

export default App;
