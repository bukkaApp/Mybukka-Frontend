import {
  SET_SELECTED_LOCATION,
  SET_SELECTED_COORDINATES
} from 'Redux/actionTypes';

const initialState = {
  selectedLocation: {},
  coordinates: [3.361476, 6.5560715]
};

const selectedLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LOCATION: {
      const { suggestion, coordinates } = action.location;
      return {
        ...state,
        selectedLocation: suggestion,
        coordinates,
      };
    }

    case SET_SELECTED_COORDINATES:
      return {
        ...state,
        coordinates: action.location,
        selectedLocation: {},
      };

    default: {
      return state;
    }
  }
};

export default selectedLocationReducer;
