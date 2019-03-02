import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleApiKey from '../InputAttribute/inputData.json';

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
    <div>
      <Map
        style={{
          minWidth: '200px',
          minHeight: '140px'
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
  apiKey: googleApiKey.google_api,
  v: '3'
})(MapContainer);

MapContainer.propTypes = {
  google: PropTypes.shape({}).isRequired,
};
