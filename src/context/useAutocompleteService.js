/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Script from 'react-load-script';
import { useLocationContext } from './LocationContext';
import { useLocationsPredictionContext } from './LocationsPrediction';
import { useLoadingContext } from './UseLoading';

let placesService;// eslint-disable-line
let autoCompleteService;
let GeoCoderService;

/* global google */
const useAutocompleteService = (callback = null, withLoading = false) => {
  // const wrapper = React.createRef();
  const mounted = React.useRef(false);
  // const attribution = React.createRef();
  const scriptReady = React.useRef(false);

  const handleScriptLoad = () => {
    autoCompleteService = new google.maps.places.AutocompleteService();
    // placesService = new google.maps.places.PlacesService(attribution.current);
    GeoCoderService = new google.maps.Geocoder();
  };

  useEffect(() => {
    mounted.current = true;
    if (scriptReady.current) {
      handleScriptLoad();
    } else if (window.google) {
      handleScriptLoad();
    }
  }, []);

  const { loading } = useLoadingContext();
  const [hasFocus, setFocus] = useState(false);
  const { selectedLocation, setGoogleLocation } = useLocationContext();
  const { updatePredictions, predictions: expectedPredictions } = useLocationsPredictionContext();
  const [inputData, setInputData] = useState('');

  const handleChange = ({ target: { value } }) => {
    setInputData(value);
    if (autoCompleteService && value) {
      autoCompleteService.getPlacePredictions(
        { input: value.toLowerCase().trim() /* , types: ['establishment'] */}, (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          } if (callback) callback(predictions.length ? predictions.slice(0, 3) : []);
          else { updatePredictions(predictions); }
        });
    }
  };

  const geoCodeLocation = (suggestion) => {
    if (withLoading) loading('LOC', true);
    const placeId = suggestion.place_id;
    GeoCoderService.geocode({ placeId }, async (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      if (withLoading) loading('LOC', false);
      setInputData(suggestion.description);
      setGoogleLocation({ coordinates, suggestion });
      setFocus(false);
    });
  };

  const emitSelection = (suggestion) => {
    placesService.getDetails({
      fields: ['website', /* 'photos', */ 'formatted_phone_number', 'address_components', 'geometry.location'],
      placeId: suggestion.place_id,
    }, (result, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        // return;
      }
      // this.props.onSelected( {...suggestion, ...result });
    });
  };

  const handleClick = (predict, isGeoCode) => {
    if (withLoading) loading('LOC', true);
    const predictionDatum = predict || inputData || selectedLocation.description;
    if (!isGeoCode && predictionDatum) {
      autoCompleteService.getPlacePredictions(
        { input: predictionDatum.toLowerCase().trim() }, (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          geoCodeLocation(predictions[0]);
        });
    } else { geoCodeLocation(predict); }
    if (withLoading) loading('LOC', false);
  };

  const LoadService = () => (
    window.google ? <div onLoad={() => { mounted.current ? handleScriptLoad() : scriptReady.current = true; }} /> // eslint-disable-line
      : <Script
        url={`https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false&key=${process.env.GOOGLE_API_KEY}&libraries=places&callback=initMap`}
        onLoad={() => { mounted.current ? handleScriptLoad() : scriptReady.current = true; }} // eslint-disable-line
      />
  );

  return { predictions: expectedPredictions, LoadService, emitSelection, handleChange, handleClick, inputData, setInputData, hasFocus, setFocus, geoCodeLocation };
};

export default useAutocompleteService;
