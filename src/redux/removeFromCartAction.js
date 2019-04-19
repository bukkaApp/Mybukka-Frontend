import { REMOVE_FROM_CART } from 'Redux/actionTypes';

const removeFromCartAction = slug => dispatch => dispatch({
  type: REMOVE_FROM_CART,
  slug,
});

export default removeFromCartAction;
