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
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.location
      };

    case SET_SELECTED_COORDINATES:
      return {
        ...state,
        coordinates: action.location
      };

    default: {
      return state;
    }
  }
};

export default selectedLocationReducer;
