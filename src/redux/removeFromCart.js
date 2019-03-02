import { UPDATE_CART } from 'Redux/actionTypes';

const removeFromCart = slug => dispatch =>
  dispatch({ type: `${UPDATE_CART}_REMOVE`, slug });

export default removeFromCart;
