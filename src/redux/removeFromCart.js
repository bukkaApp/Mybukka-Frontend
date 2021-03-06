import { UPDATE_CART } from 'Redux/actionTypes';
import axios from 'Redux/axios';


const updateCart = (data, status) => ({
  type: `${UPDATE_CART}_${status}`,
  data,
});

const updateCartAction = (slug, index) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('x-access-token');
    if (!token) return dispatch({ type: `${UPDATE_CART}_REMOVE`, slug, index });
    dispatch({ type: `${UPDATE_CART}_REMOVE`, slug, index });
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
