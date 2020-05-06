import { useEffect, useState, useReducer } from 'react';
import { UPDATE_LOCATIONS_PREDICTION } from 'src/redux/actionTypes';
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

const useLocationsPrediction = () => {
  // TODO: loader status:
  // const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);


  useEffect(() => {
    setData(state);
  }, [state, setData]);

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
  LocationsPredictionProvider, useLocationsPredictionContext] = constate(useLocationsPrediction);
