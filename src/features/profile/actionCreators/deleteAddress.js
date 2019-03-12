import { DELETE_USER_ADDRESS } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const deleteAddressAction = (type, data) => ({
  type: `${DELETE_USER_ADDRESS}_${type}`,
  data,
});

const deleteAddressStatus = (type, status) => ({
  type: `${DELETE_USER_ADDRESS}_${type}`,
  deleted: status,
});

const deleteAddress = url => async (dispatch) => {
  try {
    dispatch(loading(DELETE_USER_ADDRESS, true));
    deleteAddressStatus('SUCCESS', false);
    const request = await axios({
      method: 'DELETE',
      url,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(deleteAddressAction('SUCCESS', request.data, true));
    deleteAddressStatus('SUCCESS', true);
    dispatch(loading(DELETE_USER_ADDRESS, false));
  } catch (error) {
    dispatch(loading(DELETE_USER_ADDRESS, false));
    dispatch(deleteAddressAction('ERROR', error.response.data));
  }
};

export default deleteAddress;
