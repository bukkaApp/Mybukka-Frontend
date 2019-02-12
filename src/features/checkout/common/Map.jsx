/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleApiKey from '../InputAttribute/inputData.json';


/**
 * @class Mapcontainer
 */
export class MapContainer extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  /**
   * @param {*} props
   * @param {*} marker
   * @param {*} e
   * @returns {jsx} jsx
   */
  onMarkerClick(props, marker) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  /**
 * @method render
 * @memberof MapContainer
 * @return {jsx} component
 */
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map
          style={{
            minWidth: '200px',
            minHeight: '140px'
          }}
          google={this.props.google}
          zoom={14}
        >
          <Marker
            onClick={this.onMarkerClick}
            icon={{
              url: '/img/icon.svg',
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(64, 64)
            }}
            name={'Current location'}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiKey.google_api,
  v: '3'
})(MapContainer);

MapContainer.propTypes = {
  google: PropTypes.bool.isRequired
};
