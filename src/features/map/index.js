import React, { useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';

import { useMapContext } from '../../context/MapContext';
import MarkerIcon from '../../assets/rounded.svg';

import './index.scss';
import OrderCard from './../../components/order-card/OrderCard';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearCurrentView } from '../../redux/activeOrder';

const Map = ({ activeOrderReducer, clearCurrent }) => {
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState(null);
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
  useEffect(() => {
    try {
      const directionsService = new google.maps.DirectionsService();

      const origin = { lat: 40.756795, lng: -73.954298 };
      const destination = { lat: 41.756795, lng: -78.954298 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google && google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google && google.maps.DirectionsStatus.OK) {
            console.log({ result });
            setResult(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } catch (error) {
      console.log({ error });
    }
  }, [hasMap, isLoaded]);
  useEffect(() => {
    if (!currentView) {
      setRedirect(true);
    }
  }, [currentView]);
  if (!(hasMap && isLoaded)) {
    return <div> loading</div>;
  }
  return (
    <div className="container-fluid p-0">
      {redirect && <Redirect to="/" />}
      <GoogleMap
        // center={center}
        center={{ lat: 40.756795, lng: -73.954298 }}
        zoom={14}
        mapContainerClassName="full-page"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker
          key="79"
          center={{ lat: 40.756795, lng: -73.954298 }}
          position={center}
          icon={MarkerIcon}
        />
        {/* <DirectionsService
          options={{
            destination: 'ikola ilumo',
            origin: 'command road',
            travelMode: 'Driving',
          }}
        /> */}
        <DirectionsRenderer
          options={{ direction: result }}
          callback={handleResponse}
        />
        <OrderCard
          clear={() => clearCurrent()}
          data={currentView}
          item={items}
          isPending={isPending}
        />
      </GoogleMap>
    </div>
  );
};

// const { currentView, items, isPending } = usePendingOrderContext();
const mapStateToProps = ({ activeOrderReducer }) => ({
  activeOrderReducer,
});
const mapDispatchToProps = (dispatch) => ({
  clearCurrent: () => dispatch(clearCurrentView()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Map);
