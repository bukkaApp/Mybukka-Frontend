import axios from 'Redux/axios';

import { UPDATE_CART } from 'Redux/actionTypes';

const updateCart = (data, status) => ({
  type: `${UPDATE_CART}_${status}`,
  data,
});

const updateCartAction = (updatedCart, updateLocally) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('x-access-token');
    if (!token || updateLocally) return dispatch(updateCart(updatedCart, 'LOCAL'));
    dispatch(updateCart(updatedCart, 'LOCAL'));
    const cart = await getState().cartReducer.items;
    const request = await axios({
      url: '/cart',
      method: 'PUT',
      data: { items: cart },
      headers: {
        Authorization: token,
        accept: 'application/json',
      }
    });
    dispatch(updateCart(request.data, 'SUCCESS'));
  } catch (error) {
    if (error.response) {
      dispatch(updateCart(error.response, 'ERROR'));
    }
    dispatch(updateCart(error, 'ERROR'));
  }
};

export default updateCartAction;
