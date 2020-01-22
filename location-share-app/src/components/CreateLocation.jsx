import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/projectActions';
import classnames from 'classnames';

// Custom CSS
import '../assets/css/components/create-location.css';

class CreateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
      text: '',
      image: '',
      imagePreviewUrl: '',
      imageName: '',
      errors: {},
    };

    // Register methods
    this.handleChange = this.handleChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.createLocation = this.createLocation.bind(this);
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
    this.setState({ imagePreviewUrl: '', imageName: '', image: '' });
  }

  // Send on Server
  _handleSubmit(event) {
    event.preventDefault();
    // console.log('handle submit - ', this.state.image);
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
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  // Create new location
  createLocation(event) {
    event.preventDefault();

    // Create payload for Server
    const newLocation = {
      title: this.state.title,
      street: this.state.street,
      streetNumber: this.state.streetNumber,
      zip: this.state.zip,
      city: this.state.city,
      text: this.state.text,
    };

    // Send payload
    this.props.createPost(newLocation, this.props.history);
  }

  render() {
    // Check errors
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
      <section className="create-location">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Create New Location</h1>

          <div className="card">
            <div className="card-body">
              <form>
                {/* START Title */}
                <div className="form-group pt-2">
                  <input
                    type="text"
                    name="title"
                    className={classnames('form-control', { 'is-invalid': errors.title })}
                    placeholder="Title"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                {/* END Title */}

                {/* START Street */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="street"
                    className={classnames('form-control', { 'is-invalid': errors.street })}
                    placeholder="Street"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                </div>
                {/* END Street */}

                {/* START Street Number */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="streetNumber"
                    className="form-control"
                    placeholder="Street Number"
                    onChange={this.handleChange}
                  />
                </div>
                {/* END Street Number */}

                {/* START Zip */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="zip"
                    className={classnames('form-control', { 'is-invalid': errors.zip })}
                    placeholder="Zip"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                </div>
                {/* END Zip */}

                {/* START City */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="city"
                    className={classnames('form-control', { 'is-invalid': errors.city })}
                    placeholder="City"
                    required
                    onChange={this.handleChange}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                {/* END City*/}

                {/* START Textarea */}
                <div className="form-group">
                  <textarea
                    name="text"
                    className="form-control"
                    placeholder="Write something awesome."
                    rows="5"
                    onChange={this.handleChange}></textarea>
                </div>
                {/* END Textarea */}

                {/* START Image upload */}
                <div className="image-upload  pt-3 pb-5">
                  <div onSubmit={(e) => this._handleSubmit(e)} className="pr-5">
                    <div className="file btn  btn-outline-primary">
                      Upload
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => this._handleImageChange(e)}
                      />
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

                <button
                  type="submit"
                  className="btn btn-outline-danger"
                  onClick={this.createLocation}>
                  Add
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
CreateLocation.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createPost })(CreateLocation);
