import React, { useEffect } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';

import { useMapContext } from '../../context/MapContext';
import MarkerIcon from '../../assets/rounded.svg';

import './index.scss';
import OrderCard from './../../components/order-card/OrderCard';
import { usePendingOrderContext } from '../../context/PendingOrderContext';
import { connect } from 'react-redux';

const Map = ({ activeOrderReducer }) => {
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  // const { currentView, items, isPending } = usePendingOrderContext();
  const { currentView, items, isPending } = activeOrderReducer;

  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);

  const center = {
    lat: 6.5355,
    lng: 3.3087,
  };
  const handleResponse = (response) => {
    console.log({ response });
  };
  if (!(hasMap && isLoaded)) {
    return <div> loading</div>;
  }
  return (
    <div className="container-fluid p-0">
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerClassName="full-page"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        // mapContainerClassName="map"
      >
        <Marker key="79" position={center} icon={MarkerIcon} />
        <DirectionsService
          options={{
            destination: 'ikola ilumo',
            origin: 'command road',
            travelMode: 'Driving',
          }}
        />
        <DirectionsRenderer
          options={{ direction: 're' }}
          callback={handleResponse}
        />
        <OrderCard data={currentView} item={items} isPending={isPending} />
      </GoogleMap>
    </div>
  );
};

// const { currentView, items, isPending } = usePendingOrderContext();
const mapStateToProps = ({ activeOrderReducer }) => ({
  activeOrderReducer,
});
export default connect(mapStateToProps, null)(Map);
