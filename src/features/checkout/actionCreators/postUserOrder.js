import axios from 'Redux/axios';
import loading from 'Redux/loading';

import { POST_USER_ORDER, FINISH_CHARGE_TRANSACTION } from 'Redux/actionTypes';

const finishChargeTransactionAction = (status, data) => ({
  type: `${FINISH_CHARGE_TRANSACTION}_${status}`,
  data
});

const saveUserCardAction = (status, data) => ({
  type: `${POST_USER_ORDER}_${status}`,
  data
});

const saveUserCard = data => async (dispatch) => {
  try {
    dispatch(loading(POST_USER_ORDER, true));
    const request = await axios({
      method: 'POST',
      url: '/order',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(saveUserCardAction('SUCCESS', request.data));
    dispatch(finishChargeTransactionAction('SUCCESS', request.data));
    dispatch(loading(POST_USER_ORDER, false));
  } catch (error) {
    dispatch(loading(POST_USER_ORDER, false));
    dispatch(saveUserCardAction('ERROR', error.response.data));
  }
};

export default saveUserCard;
