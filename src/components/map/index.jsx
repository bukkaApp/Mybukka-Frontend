import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google, isVisible }) => {
  const [mapConfigurations, setMapConfigurations] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const onMarkerClick = (newProps, marker) => {
    setMapConfigurations({
      selectedPlace: newProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  if (!google) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Map
        style={{
          minWidth: '200px',
          minHeight: '140px'
        }}
        google={google}
        zoom={14}
        visible={isVisible}
      >
        <Marker
          onClick={onMarkerClick}
          icon={{
            url: '/img/icon.svg',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
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

MapContainer.defaultProps = {
  isVisible: true,
};

MapContainer.propTypes = {
  google: PropTypes.shape({}).isRequired,
  isVisible: PropTypes.bool,
};
