import { useReducer } from 'react';
import { UPDATE_LOCATIONS_PREDICTION } from 'Redux/actionTypes';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  predictions: []
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case UPDATE_LOCATIONS_PREDICTION: {
      return {
        predictions: action.predictions.length > 0 ?
          action.predictions.slice(0, 3) : []
      };
    }

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useCurrentLocation = () => {
  console.log('how many times running usecureent loacation prediction');
  // TODO: loader status:
  // const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const updateLocationsPrediction = (predictions) => {
    dispatch({
      type: UPDATE_LOCATIONS_PREDICTION,
      predictions,
    });
  };

  const { predictions } = state;

  return { predictions, updatePredictions: updateLocationsPrediction };
};

export const [
  LocationsPredictionProvider, useLocationsPredictionContext] = constate(useCurrentLocation);
