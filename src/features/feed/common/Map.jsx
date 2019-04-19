import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './map.scss';

const MapContainer = (props) => {
  const [mapConfigurations, setMapConfigurations] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  });

  const onMarkerClick = (newProps, marker) => {
    setMapConfigurations({
      selectedPlace: newProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  if (!props.google) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-map-container">
      <Map
        style={{
          minWidth: '200px',
          minHeight: '140px',
        }}
        initialCenter={{
          lat: 6.5419476,
          lng: 3.356072
        }}
        google={props.google}
        zoom={14}
      >
        <Marker
          onClick={onMarkerClick}
          icon={{
            url: '/img/icon.svg',
            anchor: new google.maps.Point(32, 32), // eslint-disable-line
            scaledSize: new google.maps.Size(64, 64)  // eslint-disable-line
          }}
          name={'Current location'}
        />
        <InfoWindow
          marker={mapConfigurations.activeMarker}
          visible={mapConfigurations.showingInfoWindow}
        >
          <div>
            <h1>{mapConfigurations.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
  v: '3'
})(MapContainer);

MapContainer.propTypes = {
  google: PropTypes.shape({}).isRequired,
};
