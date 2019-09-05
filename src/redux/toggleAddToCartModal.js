import { TOGGLE_ADD_TO_CART_MODAL } from 'Redux/actionTypes';

const toggleAddToCartModal = modalShow => dispatch => dispatch({
  type: TOGGLE_ADD_TO_CART_MODAL,
  modalShow,
});

export default toggleAddToCartModal;
