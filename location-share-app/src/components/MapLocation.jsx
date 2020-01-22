import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MaterialIcon from 'material-icons-react';
import '../assets/css/components/map-location.css';
import axios from 'axios';

export default class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 800,
        height: 500,
        latitude: 0,
        longitude: 0,
        zoom: 16,
      },
      address: '',
      latitude: 0,
      longitude: 0,
      addressNotFound: false,
    };
  }

  componentDidMount() {
    // Take address from localStorage
    let address = sessionStorage.getItem('address');
    // For SwissTopo API
    const LIMIT = 1;

    // Call SwissTopo API and get coords from address
    try {
      axios
        .get(
          `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURI(
            address,
          )}&type=locations&limit=${LIMIT}`,
        )
        .then((response) => {
          // Any address find show alert message
          if (!response.data.results[0]) {
            this.setState({ noAddressFound: true }, () => {
              window.setTimeout(() => {
                this.setState({ noAddressFound: false });
              }, 8000);
            });
            return 0;
          }

          // Find address update maps and marker coords
          this.setState({
            viewport: {
              ...this.state.viewport,
              latitude: response.data.results[0].attrs.lat,
              longitude: response.data.results[0].attrs.lon,
            },
            latitude: response.data.results[0].attrs.lat,
            longitude: response.data.results[0].attrs.lon,
          });
        });
    } catch (error) {
      console.error('Axios error', error);
    }
  }

  render() {
    return (
      <div className=" pt-5">
        <div className="button-position pb-4">
          <div className="btn btn-outline-primary">
            <Link to="/">Back</Link>
          </div>
        </div>
        {/* START Map error */}
        {this.state.noAddressFound && (
          <div className="container">
            <div className="alert alert-warning" role="alert">
              Och noo you have incorrect address.
            </div>
          </div>
        )}
        {/* END Map error */}

        <div className="map-box">
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}>
            <Marker
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              offsetLeft={-20}
              offsetTop={-10}>
              <div>
                <MaterialIcon icon="where_to_vote" color="#d9534f" size="large" />
              </div>
            </Marker>
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
