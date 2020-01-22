import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { createNewUser } from '../actions/securityActions';
import { getUser } from '../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Custom CSS
import '../assets/css/components/create-location.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      file: '',
      imagePreviewUrl: '',
      imageName: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Check props for that post from DB per Redux
  componentWillReceiveProps(nextProps) {
    const { id, firstName, lastName, username, password, confirmPassword } = nextProps.user;

    this.setState({
      id,
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    // Find ID from URL
    const { id } = this.props.match.params;
    // Take data from server
    this.props.getUser(id, this.props.history);
  }

  //* Check inputs for changes
  handleChange(event) {
    //* Find the right state and save content from input into state
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  deleteImage() {
    this.setState({ imagePreviewUrl: '', imageName: '', file: '' });
  }

  _handleSubmit(event) {
    event.preventDefault();
    // console.log('handle submit - ', this.state.file);
  }

  _handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    this.setState({ imageName: file.name });

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit(event) {
    event.preventDefault();

    const editUser = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(editUser, this.props.history);
  }

  render() {
    // Check errors
    const { errors } = this.state;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt={this.state.imageName} />;
    } else {
      $imagePreview = <div className="previewText"></div>;
    }

    return (
      <section className="user-profile">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Edit User Profile</h1>

          <div className="card">
            <div className="card-body">
              <form>
                {/* START First Name */}
                <div className="form-group pt-2">
                  <input
                    type="text"
                    name="firstName"
                    className={classnames('form-control', { 'is-invalid': errors.firstName })}
                    placeholder="First Name"
                    required
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                {/* END First Name */}

                {/* START Last Name */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="lastName"
                    className={classnames('form-control', { 'is-invalid': errors.lastName })}
                    placeholder="Last Name"
                    required
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                {/* END Last Name */}

                {/* START UserName - Email */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="email"
                    name="username"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={this.state.username}
                    disabled
                  />
                </div>
                {/* END UserName - Email */}

                {/* START Password */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="password"
                    name="password"
                    className={classnames('form-control', { 'is-invalid': errors.password })}
                    placeholder="Password"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                {/* END Password */}

                {/* START Password Repeat */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    className={classnames('form-control', { 'is-invalid': errors.confirmPassword })}
                    placeholder="Repeat Password"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                {/* END Password repeat*/}

                {/* START Image upload */}
                <div className="image-upload  pt-3 pb-5">
                  <div onSubmit={(e) => this._handleSubmit(e)} className="pr-5">
                    <div className="file btn  btn-outline-primary">
                      Upload
                      <input type="file" name="file" onChange={(e) => this._handleImageChange(e)} />
                    </div>
                  </div>

                  {/* START Delete icon */}
                  <div className="delete-icon">
                    <MaterialIcon icon="delete" color="#d9534f" onClick={this.deleteImage} />
                    <p className="pl-3">{this.state.imageName}</p>
                  </div>
                  {/* END Delete icon */}

                  {/* Show loaded image as preview */}
                  <div className="imgPreview">{$imagePreview}</div>
                </div>
                {/* END Image upload */}

                <button type="submit" className="btn btn-outline-danger" onClick={this.onSubmit}>
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// Redux
UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  createNewUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.post.user,
});

export default connect(mapStateToProps, { getUser, createNewUser })(UserProfile);
