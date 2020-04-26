import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, /* useLoadScript, */ } from '@react-google-maps/api';
import { useLocationContext } from '../../context/LocationContext';
import useScript from '../../context/useScript';
import mapStyles from '../../shared/mapStyles.json';
import marker from '../../assets/marker.svg';
import './map.scss';

const locations = [
  {
    text: "Manfred's Bakery",
    labelOrigin: { x: 85, y: 14 },
    location: { lat: 6.5419476, lng: 3.356072 }
  },
  {
    text: "Jenny's Shop",
    labelOrigin: { x: 70, y: 14 },
    location: { lat: 6.5419876, lng: 3.356172 }
  }
];

const Map = () => {
  let google; // eslint-disable-line
  const { coordinates: [lng, lat] } = useLocationContext();

  const [showInfo, setShowInfo] = useState(false);
  const [error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=loaderCB01587784933894&libraries=places&v=3&language=en`);
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY
  // });

  useEffect(() => {
    google = window.google;
  }, []);

  if (error) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  const mapJsx = (<GoogleMap
    mapContainerClassName="Map"
    zoom={16}
    center={{ lng, lat }}
    options={{ styles: mapStyles }}
  >
    {locations.map(loc =>
      (<Marker
        key={loc.text}
        position={loc.location}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        label={{
          text: loc.text,
          fontWeight: 'bold',
          fontSize: '12px',
        }}
        onClick={() => setShowInfo(!showInfo)}
      />)
    )}
  </GoogleMap>);


  return !error && mapJsx;
};

export default Map;
