import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, Marker, /* useLoadScript, */ } from '@react-google-maps/api';
import { useLocationContext } from '../../context/LocationContext';
import mapStyles from '../../shared/mapStyles.json';
import marker from '../../assets/marker.svg';
import './map.scss';
import { useMapContext } from '../../context/MapContext';

const Map = ({ useBusinesses, nearbyBukkas, fetchedBukka, zoom }) => {
  const [showInfo, setShowInfo] = useState(false);
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  const { coordinates } = useLocationContext();
  const userLocs = coordinates || [3.356172, 6.5419876];
  const [lng, lat] = userLocs;

  // show map
  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);

  const edit = 'c_scale,fl_clip,r_100,w_30';
  const { coordinates: businessLoc, logoImg, name } = fetchedBukka;
  let img = (fetchedBukka.logoImg && logoImg.split('upload')) || null;
  let businessLocs = businessLoc || [3.356172, 6.5419876];

  let location = [{
    text: (name && name.length) ? name : '',
    icon: img ? `${img[0]}upload/${edit}${img[1]}` : marker,
    labelOrigin: { x: 70, y: 14 },
    location: { lat: businessLocs[1], lng: businessLocs[0] }
  }];

  if (useBusinesses && nearbyBukkas.length > 0) {
    location = nearbyBukkas.map((bukka, ind) => {
      const { location: { coordinates: coords } } = bukka;
      businessLocs = coords || [3.356172, 6.5419876];
      img = (bukka.logoImg && bukka.logoImg.split('upload')) || null;
      return ({
        text: bukka.name || '',
        icon: img ? `${img[0]}upload/${edit}${img[1]}` : marker,
        labelOrigin: { x: 70 + ind, y: 14 },
        location: { lat: businessLocs[1], lng: businessLocs[0] }
      });
    });
  }

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.GOOGLE_API_KEY
  // });

  // if (loadError) {
  //   return <div>Map cannot be loaded right now, sorry.</div>;
  // }

  const mapJsx = (<GoogleMap
    mapContainerClassName="Map"
    zoom={zoom || 10}
    center={{ lng, lat }}
    options={{ styles: mapStyles }}
  >
    {location.map(loc =>
      (<Marker
        key={loc.text}
        position={loc.location}
        icon={{
          url: loc.icon,
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


const mapStateToProps = ({
  businessReducer: { fetchedBukka },
  businessesReducer: { fetchedBukkas: { nearbyBukkas } },
}) => ({
  fetchedBukka,
  nearbyBukkas,
});

export default connect(mapStateToProps)(Map);
