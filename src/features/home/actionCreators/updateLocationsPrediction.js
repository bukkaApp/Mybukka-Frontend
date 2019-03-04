import { UPDATE_LOCATIONS_PREDICTION } from 'Redux/actionTypes';

const updateLocationsPrediction = predictions => dispatch =>
  dispatch({ type: UPDATE_LOCATIONS_PREDICTION, predictions });

export default updateLocationsPrediction;
