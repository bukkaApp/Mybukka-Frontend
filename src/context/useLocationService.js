/* eslint-disable max-len */
import { useState, useCallback } from 'react';
import { useLocationContext } from './LocationContext';
import { useLocationsPredictionContext } from './useLocationsPrediction';
import useScript from './useScript';

const useLocationPrediction = () => {
  useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places&v=3&language=en`);

  // console.log('google', google, ref);
  const [isFocused, setFocus] = useState(false);
  const { selectedLocation, setGoogleLocation } = useLocationContext();
  const { updatePredictions } = useLocationsPredictionContext();
  //   const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [inputData, setInputData] = useState('');

  const displaySuggestions = useCallback((predictions, status) => {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    updatePredictions(predictions);
  }, [updatePredictions]);

  const handleChange = ({ target: { value } }) => {
    setInputData(value);
    if (value) {
      const autoCompleteService = new window.google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: value },
        displaySuggestions
      );
    }
  };

  const geoCodeLocation = (suggestion) => {
    const placeId = suggestion.place_id;
    const GeoCoder = new window.google.maps.Geocoder();
    GeoCoder.geocode({ placeId }, async (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      setInputData(suggestion.description);
      setGoogleLocation({ coordinates, suggestion });
      setFocus(false);
    });
  };

  const onClickPredictions = (predictions, status) => {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    geoCodeLocation(predictions[0]);
  };

  const handleClick = (predict) => {
    const predictionDatum = predict || inputData || selectedLocation.description;
    if (predictionDatum) {
      // handleLoader();
      const autoCompleteService = new window.google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: predictionDatum },
        onClickPredictions
      );
    }
  };

  return { handleChange, handleClick, inputData, setInputData, isFocused, setFocus, geoCodeLocation };
};

export default useLocationPrediction;
