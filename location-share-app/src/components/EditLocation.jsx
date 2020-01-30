import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { getPost, createPost } from '../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params,
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Life cycle hooks
  componentWillReceiveProps(nextProps) {
    const { id, title, street, streetNumber, zip, city, text, image } = nextProps.post;

    this.setState({
      id,
      title,
      street,
      streetNumber,
      zip,
      city,
      text,
      image,
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    // Find ID from URL
    const { id } = this.props.match.params;
    // Take data from server
    this.props.getPost(id, this.props.history);
  }

  // Check inputs for changes
  handleChange(event) {
    // Find the right state and save content from input there
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Update Post
  onSubmit(event) {
    event.preventDefault();

    // Create payload for Server
    let formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('title', this.state.title);
    formData.append('street', this.state.street);
    formData.append('streetNumber', this.state.streetNumber);
    formData.append('zip', this.state.zip);
    formData.append('city', this.state.city);
    formData.append('text', this.state.text);

    if (this.state.image.name === undefined) {
      formData.append('image', this.state.image);
    } else {
      formData.append('file', this.state.image, this.state.image.name);
    }

    // Send payload
    this.props.createPost(formData, this.props.history);
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

  render() {
    // Check errors
    const { errors } = this.state;

    // Set image preview from state
    let { imagePreviewUrl } = this.state;

    console.log('Image froim server', this.state.image);

    let $imagePreview = null;
    // Create HTML img element with loaded image and show preview if exist
    if (this.state.image && this.state.imagePreviewUrl === '') {
      $imagePreview = (
        <img src={'http://localhost:8080/images/' + this.state.image} alt={this.state.imageName} />
      );
    } else if (this.state.imagePreviewUrl) {
      $imagePreview = <img src={this.state.imagePreviewUrl} alt={this.state.imageName} />;
    } else {
      $imagePreview = <div className="previewText"></div>;
    }

    return (
      <section className="create-location">
        <div className="container">
          <h1 className="d-flex justify-content-center pb-4 pt-4">Edit Location</h1>

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
                    value={this.state.title}
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
                    className="form-control"
                    placeholder="Street"
                    value={this.state.street}
                    disabled
                  />
                </div>
                {/* END Street */}

                {/* START Street Number */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="streetNumber"
                    className="form-control"
                    placeholder="Street Number"
                    value={this.state.streetNumber}
                    disabled
                  />
                </div>
                {/* END Street Number */}

                {/* START Zip */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="zip"
                    className="form-control"
                    placeholder="Zip"
                    disabled
                    value={this.state.zip}
                  />
                </div>
                {/* END Zip */}

                {/* START City */}
                <div className="form-group pt-2 pb-2">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    disabled
                    value={this.state.city}
                  />
                </div>
                {/* END City*/}

                {/* START Textarea */}
                <div className="form-group">
                  <textarea
                    name="text"
                    className="form-control"
                    placeholder="Write something awesome."
                    rows="5"
                    value={this.state.text}
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

EditLocation.protoTypes = {
  getPost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post.post,
});

export default connect(mapStateToProps, { getPost, createPost })(EditLocation);
