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
    console.log(newProps, marker);
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
        {props.restaurants.map(({ location: { coordinates }, name, imageUrl }) => (
          <Marker
            position={{ lat: coordinates[1], lng: coordinates[0] }}
            onClick={onMarkerClick}
            icon={{
              url: 'https://res.cloudinary.com/mybukka/image/upload/c_scale,r_50,w_30,h_30/v1580550858/yaiwq492u1lwuy2lb9ua.png',
            anchor: new google.maps.Point(32, 32), // eslint-disable-line
            scaledSize: new google.maps.Size(30, 30)  // eslint-disable-line
            }}
            name={name}
          />))}
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
