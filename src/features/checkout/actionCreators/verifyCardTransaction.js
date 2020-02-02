import axios from 'Redux/axios';
import loading from 'Redux/loading';

import { VERIFIED_CARD_TRANSACTION } from 'Redux/actionTypes';

const verifyCardTransactionAction = (status, data) => ({
  type: `${VERIFIED_CARD_TRANSACTION}_${status}`,
  data
});

const verifyCardTransaction = reference => async (dispatch) => {
  try {
    dispatch(loading(VERIFIED_CARD_TRANSACTION, true));
    const request = await axios({
      method: 'GET',
      url: `/card/verify/${reference}`,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(verifyCardTransactionAction('SUCCESS', request.data));
    dispatch(loading(VERIFIED_CARD_TRANSACTION, false));
  } catch (error) {
    dispatch(loading(VERIFIED_CARD_TRANSACTION, false));
    dispatch(verifyCardTransactionAction('ERROR', error.response));
  }
};

export default verifyCardTransaction;
