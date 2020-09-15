import { useState, useMemo } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { useLocationsPredictionContext } from '../context/LocationsPrediction';
import { useLoadingContext } from '../context/LoadingContext';
import { useMapContext } from '../context/MapContext';

let placesService; // eslint-disable-line
let autoCompleteService;
let GeoCoderService;

/* global google */
const useAutocompleteService = (callback = null, withLoading = false) => {
  const { isLoaded } = useMapContext();
  const { loading } = useLoadingContext();
  const [hasFocus, setFocus] = useState(false);
  const { selectedLocation, setGoogleLocation } = useLocationContext();
  const {
    updatePredictions,
    predictions: expectedPredictions,
  } = useLocationsPredictionContext();
  const [inputData, setInputData] = useState('');

  const handleScriptLoad = () => {
    autoCompleteService = new google.maps.places.AutocompleteService();
    // placesService = new google.maps.places.PlacesService(attribution.current);
    GeoCoderService = new google.maps.Geocoder();
  };

  // console.log('use Auto complee serve outside ???');
  useMemo(() => {
    if (isLoaded) handleScriptLoad();
  }, [isLoaded]);

  const handleChange = ({ target: { value } }) => {
    setInputData(value);
    if (autoCompleteService && value) {
      autoCompleteService.getPlacePredictions(
        { input: value.toLowerCase().trim() /* , types: ['establishment'] */ },
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }
          if (callback)
            callback(predictions.length ? predictions.slice(0, 3) : []);
          else {
            updatePredictions(predictions);
          }
        }
      );
    }
  };

  const geoCodeLocation = (suggestion) => {
    if (withLoading) loading(true);
    if (!suggestion) return alert('type your location');
    const placeId = suggestion.place_id;
    GeoCoderService.geocode({ placeId }, async (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      setInputData(suggestion.description);
      setGoogleLocation({ coordinates, suggestion });
      setFocus(false);
      if (withLoading) loading(false);
    });
  };

  const emitSelection = (suggestion) => {
    if (!suggestion) return alert('type your location');
    placesService.getDetails(
      {
        fields: [
          'website',
          /* 'photos', */ 'formatted_phone_number',
          'address_components',
          'geometry.location',
        ],
        placeId: suggestion.place_id,
      },
      (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          // return;
        }
        // this.props.onSelected( {...suggestion, ...result });
      }
    );
  };

  const handleClick = (predict, isGeoCode) => {
    if (withLoading) loading(true);
    const predictionDatum =
      predict || inputData || selectedLocation.description;
    if (!isGeoCode && predictionDatum) {
      autoCompleteService.getPlacePredictions(
        { input: predictionDatum.toLowerCase().trim() },
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          geoCodeLocation(predictions[0]);
        }
      );
    } else {
      geoCodeLocation(predict);
    }
    if (withLoading) loading('LOC', false);
  };

  return useMemo(
    () => ({
      predictions: expectedPredictions,
      emitSelection,
      handleChange,
      handleClick,
      inputData,
      setInputData,
      hasFocus,
      setFocus,
      geoCodeLocation,
    }),
    [isLoaded, inputData]
  );
};

export default useAutocompleteService;
