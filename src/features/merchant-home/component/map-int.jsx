import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) =>
  <div>
    {text}
  </div>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};
 
class MapIntegration extends Component {
  static defaultProps = {
    center: {
      lat: 6.5244,
      lng: 3.3792
    },
    zoom: 11
  };

 
render() {
  return (
    
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50vw' }}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: ("AIzaSyA5QTLzI_s5UofZkFNX4UeLrCwrIDG0qYs") }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <AnyReactComponent
          lat={6.4698}
          lng={3.58522}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
}

export default MapIntegration;



