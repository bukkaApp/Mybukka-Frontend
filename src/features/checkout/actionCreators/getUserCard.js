import axios from 'Redux/axios';
import loading from 'Redux/loading';

import { FETCH_USER_CARD } from 'Redux/actionTypes';

const getDefaultCardAction = (status, data) => ({
  type: `${FETCH_USER_CARD}_${status}`,
  data
});

const getDefaultCard = () => async (dispatch) => {
  try {
    dispatch(loading(FETCH_USER_CARD, true));
    const response = await axios({
      method: 'GET',
      url: '/card',
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(getDefaultCardAction('SUCCESS', response.data));
    dispatch(loading(FETCH_USER_CARD, false));
  } catch (error) {
    dispatch(loading(FETCH_USER_CARD, false));
    dispatch(getDefaultCardAction('ERROR', error.response.data));
  }
};

export default getDefaultCard;
