import { SET_CHECKOUT_MODE } from 'Redux/actionTypes';

const setCheckoutMode = mode => dispatch =>
  dispatch({ type: SET_CHECKOUT_MODE, mode });

export default setCheckoutMode;
