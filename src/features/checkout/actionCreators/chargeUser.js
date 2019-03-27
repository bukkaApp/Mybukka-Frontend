import axios from 'Redux/axios';
import loading from 'Redux/loading';
import { CHARGE_USER } from 'Redux/actionTypes';

const chargeUserAction = (status, data) => ({
  type: `${CHARGE_USER}_${status}`,
  data
});

const chargeUser = data => async (dispatch) => {
  try {
    dispatch(loading(CHARGE_USER, true));
    const request = await axios({
      method: 'POST',
      url: '/pay/charge',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(chargeUserAction('SUCCESS', request.data));
    dispatch(loading(CHARGE_USER, false));
  } catch (error) {
    dispatch(loading(CHARGE_USER, false));
    dispatch(chargeUserAction('ERROR', error.response.data));
  }
};

export default chargeUser;
