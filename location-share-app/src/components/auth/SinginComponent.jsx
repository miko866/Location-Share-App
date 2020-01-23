import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class SinginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
      file: '',
      imagePreviewUrl: '',
      imageName: '',
      errors: {},
    };

    // Register methods
    this.handleChange = this.handleChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // Check inputs for changes
  handleChange(event) {
    // Find the right state and save content from input there
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Delete image
  deleteImage() {
    this.setState({ imagePreviewUrl: '', imageName: '', file: '' });
  }

  // Send on Server
  _handleSubmit(event) {
    event.preventDefault();
    // console.log('handle submit - ', this.state.file);
  }

  // Load image
  _handleImageChange(event) {
    event.preventDefault();

    // Read data from HTML element
    let reader = new FileReader();
    // Find image data into element
    let file = event.target.files[0];

    // Save image name into state
    this.setState({ imageName: file.name });

    // After added image find base64 and blob
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  // Create new user
  onSubmit(event) {
    event.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    // Set image preview from state
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    // Create HTML img element with loaded image and show preview if exist
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt={this.state.imageName} />;
    } else {
      $imagePreview = <div className="previewText"></div>;
    }

    return (
      <section className="singin-component">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Sing In</h1>
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
                    onChange={this.handleChange}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                {/* END Last Name */}

                {/* START UserName - Email */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="email"
                    name="userName"
                    className={classnames('form-control', { 'is-invalid': errors.userName })}
                    placeholder="Email"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
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
                  <form onSubmit={(e) => this._handleSubmit(e)} className="pr-5">
                    <div className="file btn  btn-outline-primary">
                      Upload
                      <input type="file" name="file" onChange={(e) => this._handleImageChange(e)} />
                    </div>
                  </form>

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
                  Create Account
                </button>

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

// Redux
SinginComponent.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createNewUser })(SinginComponent);
