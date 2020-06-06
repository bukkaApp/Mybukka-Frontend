import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, Marker, OverlayView, /* useLoadScript, */ } from '@react-google-maps/api';
import { useLocationContext } from '../../context/LocationContext';
import ClickOut from '../ClickOut/ClickOut';
import { useBusinessListContext } from '../../context/BusinessListContext';
import mapStyles from '../../shared/mapStyles.json';
import marker from '../../assets/marker.svg';
import './map.scss';
import { useMapContext } from '../../context/MapContext';

const Map = ({ useBusinesses, nearbyBukkas, fetchedBukka, zoom }) => {
  // const [showInfo, setShowInfo] = useState(false);
  // const [locations, setLocations] = useState([]);
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  const { coordinates, } = useLocationContext();
  const { store, setHoveredStore } = useBusinessListContext();
  const [selectedLocation, setSelectedLocation] = useState({
    name: '',
    description: '',
    _id: 0,
    headerImg: '',
    latitude: '',
    longitude: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  const [centerZoom, setCenterZoom] = useState(null);

  useEffect(() => {
    if (store && !isSelfHovered) {
      setCenterZoom({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1]
      });
    }
  }, [store, isSelfHovered]);

  const handleMarkerClick = (loc) => {
    console.log('---loc--------', loc);
    const { _id, description, name, headerImg } = loc;
    setSelectedLocation({
      _id,
      description,
      name,
      headerImg,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    });

    if (store) {
      setCenterZoom({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1]
      });
    }

    setShowOverlay(true);
  };

  const isHovered = (storeLocation) => {
    if (storeLocation && store) {
      return storeLocation._id === store._id;
    }
  };

  const handleSelfHovering = (payload) => {
    setIsSelfHovered(!!payload);
    setHoveredStore && setHoveredStore(payload);// eslint-disable-line
  };

  const userLocs = coordinates || [3.356172, 6.5419876];
  const [lng, lat] = userLocs;

  // show map
  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);

  const edit = 'c_scale,e_auto_color,fl_keep_attribution.progressive:steep,h_50,w_50,o_100,r_25';
  const { coordinates: businessLoc, logoImg, name } = fetchedBukka;
  let img = (fetchedBukka.logoImg && logoImg.split('upload')) || null;
  let businessLocs = businessLoc || [3.356172, 6.5419876];

  let locations = [{
    text: (name && name.length) ? name : '',
    icon: img ? `${img[0]}upload/${edit}${img[1]}`.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '.png') : marker,
    labelOrigin: { x: 70, y: 14 },
    coordinates: { lat: businessLocs[1], lng: businessLocs[0] }
  }];

  if (useBusinesses && nearbyBukkas.length > 0) {
    locations = nearbyBukkas.map((bukka, ind) => {
      const { location: { coordinates: coords } } = bukka;
      businessLocs = coords || [3.356172, 6.5419876];
      img = (bukka.logoImg && bukka.logoImg.split('upload')) || null;
      return ({
        ...bukka,
        text: bukka.name || '',
        icon: img ? `${img[0]}upload/${edit}${img[1]}` : marker,
        labelOrigin: { x: 70 + ind, y: 14 },
        coordinates: { lat: businessLocs[1], lng: businessLocs[0] }
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
    zoom={zoom || (lng === 10.205347 ? 6 : 12)}
    center={centerZoom || { lng, lat }}
    options={{ styles: mapStyles, gestureHandling: 'greedy' }}
  >
    {locations.map(loc =>
      (<Marker
        key={loc.text}
        position={loc.coordinates}
        icon={{
          url: loc.icon,
          scaledSize: {
            height: (isHovered(loc) && !isSelfHovered) ? 50 : 30,
            width: (isHovered(loc) && !isSelfHovered) ? 50 : 30
          },
          labelOrigin: loc.labelOrigin,
        }}
        animation={(isHovered(loc) && !isSelfHovered) ? 3 : null}
        label={{
          text: loc.text,
          fontWeight: 'bold',
          fontSize: `${(isHovered(loc) && !isSelfHovered) ? '16px' : '12px'}`,
        }}
        onClick={() => handleMarkerClick(loc)}
        onMouseOver={() => handleSelfHovering(loc)}
        onMouseOut={() => handleSelfHovering(null)}
      />)
    )}

    {showOverlay && <OverlayView
      position={{ lng: selectedLocation.longitude, lat: selectedLocation.latitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <ClickOut onClickOut={() => setShowOverlay(false)}>
        <div className="Map-infoWrapper Map-infoWrapper--visible">
          <img className="Map-infoImg" src={selectedLocation.headerImg} alt="banner" />
          <div className="Map-info">
            <h2>{selectedLocation.name}</h2>
            <p>{selectedLocation.description}</p>
          </div>
        </div>
      </ClickOut>
    </OverlayView>}
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
