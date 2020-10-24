import React, { useEffect, useState, useCallback } from 'react';
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
import axios from '../../redux/axios/index';
import { Redirect } from 'react-router-dom';
import { clearCurrentView } from '../../redux/activeOrder';

const Map = ({ activeOrderReducer, clearCurrent }) => {
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();
  const [redirect, setRedirect] = useState(false);
  const [bukka, setBukka] = useState(false);
  const [origin, setOrigin] = useState({});
  const [renderDirection, setRenderDirection] = useState('');

  const { currentView, items, isPending } = activeOrderReducer;

  const deliveryLocation = currentView.deliveryAddress.location.coordinates;
  const center = currentView &&
    deliveryLocation && { lat: deliveryLocation[1], lng: deliveryLocation[0] };

  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);

  useEffect(() => {
    if (!currentView) {
      setRedirect(true);
    }
  }, [currentView]);

  if (!(hasMap && isLoaded)) {
    return <div> loading</div>;
  }

  useEffect(() => {
    const fetchBukkaInfo = async (slug) => {
      const token = localStorage.getItem('x-access-token');
      const response = await axios.get(`/bukka/index/${slug}`, {
        headers: {
          authorization: token,
        },
      });
      setBukka(response.data?.fetchedBukka);
      const bukkaInstance = response.data?.fetchedBukka;
      console.log({ bukkaInstance });
      if (bukkaInstance) {
        const bukkaLocation = bukkaInstance.location.coordinates;
        const bukkaOrigin = bukkaInstance && {
          lat: bukkaLocation[1],
          lng: bukkaLocation[0],
        };
        setOrigin(bukkaOrigin);
      }
    };

    if (currentView?.bukkaSlug) {
      fetchBukkaInfo(currentView?.bukkaSlug);
    }
  }, [currentView]);

  const directionCallBack = (response) => {
    if (hasMap && isLoaded) {
      if (response !== null) {
        if (response.status === 'OK' && !renderDirection.status) {
          setRenderDirection(response);
        } else {
          console.log('response: ', response);
        }
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      {redirect && <Redirect to="/" />}
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerClassName="full-page"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* <Marker key="79" center={center} position={center} icon={MarkerIcon} /> */}
        <DirectionsService
          options={{
            destination: center,
            origin: origin,
            travelMode: 'DRIVING',
          }}
          callback={directionCallBack}
        />
        {renderDirection && (
          <DirectionsRenderer
            options={{
              directions: renderDirection,
            }}
          />
        )}
        <OrderCard
          clear={() => clearCurrent()}
          data={currentView}
          bukka={bukka}
          item={items}
          isPending={isPending}
        />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = ({ activeOrderReducer }) => ({
  activeOrderReducer,
});
const mapDispatchToProps = (dispatch) => ({
  clearCurrent: () => dispatch(clearCurrentView()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Map);
