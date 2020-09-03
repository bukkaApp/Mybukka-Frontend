import axios from 'Redux/axios';
import loading from 'Redux/loading';

import { FINISH_CHARGE_TRANSACTION } from 'Redux/actionTypes';

const finishChargeTransactionAction = (status, data) => ({
  type: `${FINISH_CHARGE_TRANSACTION}_${status}`,
  data
});

const finishChargeTransaction = data => async (dispatch) => {
  try {
    dispatch(loading(FINISH_CHARGE_TRANSACTION, true));
    const request = await axios({
      method: 'POST',
      url: '/pay/finish',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(finishChargeTransactionAction('SUCCESS', request.data));
    dispatch(loading(FINISH_CHARGE_TRANSACTION, false));
  } catch (error) {
    dispatch(loading(FINISH_CHARGE_TRANSACTION, false));
    dispatch(finishChargeTransactionAction('SUCCESS', error.response ? error.response.data : error));
  }
};

export default finishChargeTransaction;
