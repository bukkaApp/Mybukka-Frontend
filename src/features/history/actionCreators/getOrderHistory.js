import { FETCH_USER_ORDER_HISTORY } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const getOrderHistoryAction = (type, data) => ({
  type: `${FETCH_USER_ORDER_HISTORY}_${type}`,
  data,
});

const getOrderHistory = url => async (dispatch) => {
  try {
    dispatch(loading(FETCH_USER_ORDER_HISTORY, true));
    const request = await axios({
      method: 'GET',
      url,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(getOrderHistoryAction('SUCCESS', request.data));
    dispatch(loading(FETCH_USER_ORDER_HISTORY, false));
  } catch (error) {
    dispatch(loading(FETCH_USER_ORDER_HISTORY, false));
    dispatch(getOrderHistoryAction('ERROR', error.response.data));
  }
};

export default getOrderHistory;
