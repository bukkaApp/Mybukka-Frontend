import React, { useState, /* useEffect */ useEffect } from 'react';
import { GoogleMap, Marker, /* useLoadScript, */ } from '@react-google-maps/api';
import { useLocationContext } from '../../context/LocationContext';
import mapStyles from '../../shared/mapStyles.json';
import marker from '../../assets/marker.svg';
import './map.scss';
import { useMapContext } from '../../context/UseMap';


const defaultLocations = [
  {
    text: "Obanta's Bakery",
    labelOrigin: { x: 85, y: 14 },
    location: { lat: 6.5419476, lng: 3.356072 }
  },
  {
    text: "Basy's Shop",
    labelOrigin: { x: 70, y: 14 },
    location: { lat: 6.5419876, lng: 3.356172 }
  }
];

const Map = ({ coordinates, locations = defaultLocations }) => {
  console.log('loopppinnnggg in map componeent');
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  // let google; // eslint-disable-line
  let { coordinates: [lng, lat] } = useLocationContext();

  if (coordinates && coordinates.length) {
    [lng, lat] = coordinates;
  }

  const [showInfo, setShowInfo] = useState(false);
  // show map
  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY
  // });

  // if (loadError) {
  //   return <div>Map cannot be loaded right now, sorry.</div>;
  // }

  const mapJsx = (<GoogleMap
    mapContainerClassName="Map"
    zoom={lng === 6.5244 ? 6 : 12}
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


  return (hasMap && isLoaded) && mapJsx;
};

export default Map;
