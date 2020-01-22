import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ForgetPassword extends Component {
  render() {
    return (
      <section className="forgot-password">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Forgot Password</h1>

          <div className="card">
            <div className="card-body">
              <form>
                {/* START Email */}
                <div className="form-group pt-2">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                {/* END Email */}

                <button
                  type="submit"
                  className="btn btn-outline-danger"
                  onClick={this.loginClicked}>
                  Send Email
                </button>

                {/* Login */}
                <Link className="btn btn-link ml-5" to="/login">
                  <small className="text-primary">Login</small>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
