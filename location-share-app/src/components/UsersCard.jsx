import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions/projectActions';
import PropTypes from 'prop-types';

import '../assets/css/components/user-card.css';

class UsersCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.post;

    return (
      <section className="user-card">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4">All Users</h1>
          {/* Render Cards from bully data */}
          {users.map((item) => (
            <div className="card" key={item.id}>
              <div className="user-card__image">
                {/* <img
                  src={require(`../assets/img/${item.image}`)}
                  alt={item.image}
                  className="custom-image"
                /> */}
              </div>

              <div className="card-body">
                <h4 className="card-title">
                  {item.firstName} {item.lastName}
                </h4>
                <div className="user-card__author pb-3">
                  <p className="custom-color">{item.posts.length} Posts</p>
                </div>
              </div>

              <div className="btn btn-primary  user-card__locations">
                <Link to="/user/posts" className="nav-link text-white pr-3">
                  Show
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

// Redux
UsersCard.propsTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getUsers })(UsersCard);
