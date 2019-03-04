import { UPDATE_LOCATIONS_PREDICTION } from 'Redux/actionTypes';

const initialState = {
  predictions: []
};

const locationsPredictionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATIONS_PREDICTION:
      return {
        predictions:
          action.predictions.length > 0 ? action.predictions.slice(0, 3) : []
      };
    default: {
      return state;
    }
  }
};

export default locationsPredictionReducer;
