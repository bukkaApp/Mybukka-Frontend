import { ADD_TO_CART } from 'Redux/actionTypes';

const addToCartAction = slug => dispatch => dispatch({
  type: ADD_TO_CART,
  slug,
});

export default addToCartAction;
