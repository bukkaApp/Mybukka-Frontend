import {
  SET_SELECTED_LOCATION,
  SET_SELECTED_COORDINATES
} from 'Redux/actionTypes';

const setSelectedLocation = (location, isCoordinates) => (dispatch) => {
  if (isCoordinates) {
    dispatch({ type: SET_SELECTED_COORDINATES, location });
  } else {
    dispatch({ type: SET_SELECTED_LOCATION, location });
  }
};

export default setSelectedLocation;
