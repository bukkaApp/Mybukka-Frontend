import axios from 'Redux/axios';
import { FETCH_CART } from 'Redux/actionTypes';

const fetchCart = (status, data) => ({
  type: `${FETCH_CART}_${status}`,
  data,
});

const fetchCartAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('x-access-token');
    if (!token) return;
    const request = await axios.get('/cart', {
      method: 'GET',
      headers: {
        authorization: token,
      }
    });
    dispatch(fetchCart('SUCCESS', request.data));
  } catch (error) {
    if (error.response) {
      return dispatch(fetchCart('ERROR', error.response));
    }
    dispatch(fetchCart('ERROR', error));
  }
};

export default fetchCartAction;
