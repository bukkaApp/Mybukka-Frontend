/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const SET_SELECTED_COORDINATES = 'SET_SELECTED_COORDINATES';
const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';
const SET_UPDATE = 'SET_UPDATE';
const LOCATION_CHANGE = 'LOCATION_CHANGE';

const initialState = {
  selectedLocation: {},
  coordinates: [],
  updated: true, // subject to change
  locationChange: false,
  isLoadingCurrentLocation: null,
  isLoadingSelectedLocation: null,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_SELECTED_COORDINATES: {
      return {
        ...state,
        locationChange: !!action.payload.coordinates,
        coordinates: action.payload.coordinates,
        selectedLocation: {},
      };
    }

    case SET_SELECTED_LOCATION: {
      const { suggestion, coordinates } = action.payload;
      return {
        ...state,
        locationChange: !!suggestion,
        selectedLocation: suggestion,
        coordinates,
      };
    }

    case SET_UPDATE:
      return {
        ...state,
        updated: action.payload
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        locationChange: action.payload
      };

    default: {
      return state;
    }
  }
};

const geoLocationOptions = {
  maximumAge: 1000,
  enableHighAccuracy: true
};
const loggerReducer = logger(reducer);

const useLocation = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  // lai - Location Area Identity
  const [data, setData] = useLocalStorage('lai', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  const setLocationChange = (payload) => {
    dispatch({
      type: LOCATION_CHANGE,
      payload
    });
  };

  useEffect(() => {
    setData(state);
  }, [state]);

  const setSelectedLocation = (coordinates) => {
    dispatch({
      type: SET_SELECTED_COORDINATES,
      payload: { coordinates }
    });
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lattitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = [longitude, lattitude];
          setIsGettingLocation(false);
          setSelectedLocation(coordinates);
        },
        (err) => {
          setIsGettingLocation(false);
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        geoLocationOptions
      );
    } else {
      // Browser doesn't support Geolocation - fallback to api
      setIsGettingLocation(true);
      axios.get('https://ipapi.co/json/')
        .then((response) => {
          const { latitude, longitude } = response;
          const coordinates = [longitude, latitude];
          setIsGettingLocation(false);
          setSelectedLocation(coordinates);
        })
        .catch(() => {
          setIsGettingLocation(false);
          console.log('Hey! something went wrong - probably, check your network');
        });
    }
  };

  const setGoogleLocation = ({ suggestion, coordinates }) => {
    dispatch({
      type: SET_SELECTED_LOCATION,
      payload: { suggestion, coordinates }
    });
  };

  const setUpdate = (payload) => {
    dispatch({
      type: SET_UPDATE,
      payload
    });
  };

  const { selectedLocation, coordinates, updated, locationChange } = state;

  return { locationChange, setLocationChange, selectedLocation, coordinates, updated, setUpdate, setCurrentLocation, setGoogleLocation, loading: isGettingLocation };
};

export const [LocationProvider, useLocationContext] = constate(useLocation);
