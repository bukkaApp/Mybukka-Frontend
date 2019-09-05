import { UPDATE_CART } from 'Redux/actionTypes';

const removeFromCart = (slug, index) => dispatch =>
  dispatch({ type: `${UPDATE_CART}_REMOVE`, slug, index });

export default removeFromCart;
