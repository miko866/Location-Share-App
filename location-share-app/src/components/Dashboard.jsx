import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationController from '../controllers/AuthenticationController';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions/projectActions';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

// Custom CSS
import '../assets/css/components/location-card.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUserId: '',
    };

    // Register methods
    this.showMap = this.showMap.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  showMap(street, streetNumber, zip, city) {
    // Create address from data
    let address = street + ' ' + streetNumber + ' ' + zip + ' ' + city;
    sessionStorage.setItem('address', address);
    this.props.history.push('/map');
  }

  componentDidMount() {
    this.props.getPosts();

    let user = sessionStorage.getItem('jwtToken');
    // Check if user is logged
    if (user !== '') {
      // Check localStorage
      if (window.localStorage) {
        // Exist any item -> firstLoad -> created it
        if (!localStorage.getItem('firstLoad')) {
          localStorage['firstLoad'] = true;
          window.location.reload();
        } else localStorage.removeItem('firstLoad');
      }
    }
  }

  editLocation() {
    this.props.history.push('/editPost/:id');
  }

  render() {
    // Save data from Server
    const { posts } = this.props.post;

    // Create Token
    const token = sessionStorage.getItem('jwtToken');
    let tokenId = 0;

    if (token !== null) {
      const decoded = jwtDecode(token);
      tokenId = parseInt(decoded.id, 10);
      sessionStorage.setItem('userName', decoded.username);
      sessionStorage.setItem('userId', decoded.id);
    }

    // Variable with Auth method
    // Check if user is logged in
    const isUserLoggedIn = AuthenticationController.isUserLoggedIn();

    const userId = sessionStorage.getItem('userId');

    return (
      <section className="location-card">
        <div className="container">
          {/* Render Cards from bully data */}
          {posts.map((item) => (
            <div className="card" key={item.id}>
              {/* <img
                src={require(`../assets/img/${item.image}`)}
                className="card-img-top"
                alt={item.title}
              /> */}
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <h5>
                  {item.street} {item.streetNumber} {item.zip} {item.city}
                </h5>
                <div className="location-card__author pb-3">
                  <Link to={`/user/${userId}`}>{item.postAuthor}</Link>
                </div>
                <p className="card-text pb-3">{item.text}</p>
                <div
                  to="/map"
                  className="btn btn-outline-danger text-danger mr-4"
                  onClick={() => this.showMap(item.street, item.streetNumber, item.zip, item.city)}>
                  View on Map
                </div>

                {/* Only Logged user can see that */}
                {isUserLoggedIn && item.postAuthorId === tokenId && (
                  <Link
                    to={`/editPost/${item.id}`}
                    className="btn btn-outline-primary text-primary mr-5">
                    Edit
                  </Link>
                )}
                {isUserLoggedIn && item.postAuthorId === tokenId && (
                  <div
                    className="btn btn-link text-danger"
                    onClick={() => this.onDeleteClick(item.id)}>
                    Delete
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

// Redux
Dashboard.propsTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, deletePost })(Dashboard);
