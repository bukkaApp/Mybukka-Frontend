import { ADD_TO_CART } from 'Redux/actionTypes';

const addToCartAction = () => dispatch => dispatch({
  type: ADD_TO_CART,
});

export default addToCartAction;
