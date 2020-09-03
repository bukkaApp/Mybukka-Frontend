import { SET_DELIVERY_MODE } from 'Redux/actionTypes';

const setDeliveryMode = mode => dispatch =>
  dispatch({ type: SET_DELIVERY_MODE, mode });

export default setDeliveryMode;
