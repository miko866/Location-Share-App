import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';

// Custom CSS
import '../../assets/css/components/login-component.css';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      errors: {},
    };

    // Register methods
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Check inputs for changes
  handleChange(event) {
    // Find the right state and save content from input there
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Check props for Auth
  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // Login
  onSubmit(event) {
    event.preventDefault();

    // Payload
    const LoginRequest = {
      userName: this.state.userName,
      password: this.state.password,
    };

    // Send payload to Server
    this.props.login(LoginRequest);
  }

  render() {
    // Check errors
    const { errors } = this.state;

    return (
      <section className="custom-card-login">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Login</h1>

          <div className="card">
            <div className="card-body">
              <form>
                {/* START Email */}
                <div className="form-group pt-2">
                  <input
                    type="email"
                    name="userName"
                    className={classnames('form-control', {
                      'is-invalid': errors.userName,
                    })}
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                  {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                </div>
                {/* END Email */}

                {/* START Password */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="password"
                    name="password"
                    className={classnames('form-control', {
                      'is-invalid': errors.password,
                    })}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                {/* END Password */}

                <button type="submit" className="btn btn-outline-danger" onClick={this.onSubmit}>
                  Login
                </button>

                {/* Forget Password */}
                <Link className="btn btn-link ml-5" to="/resetPassword">
                  <small className="text-primary">Forget Password</small>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// Redux
LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(LoginComponent);
