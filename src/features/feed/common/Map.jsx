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
            onClick={onMarkerClick}
            icon={{
              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqolr_dZ2_rULsfQWEowMe9rLSmfag5V29PU6y7HLcLugL0--vEA&s',
            anchor: new google.maps.Point(coordinates[0], coordinates[1]), // eslint-disable-line
            scaledSize: new google.maps.Size(44, 44)  // eslint-disable-line
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
