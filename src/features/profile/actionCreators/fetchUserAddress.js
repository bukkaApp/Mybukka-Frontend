import { FETCH_USER_ADDRESS } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const fetchUserAddressAction = (type, data) => ({
  type: `${FETCH_USER_ADDRESS}_${type}`,
  data,
});

const fetchUserAddress = url => async (dispatch) => {
  try {
    dispatch(loading(FETCH_USER_ADDRESS, true));
    const request = await axios({
      method: 'GET',
      url,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(fetchUserAddressAction('SUCCESS', request.data));
    dispatch(loading(FETCH_USER_ADDRESS, false));
  } catch (error) {
    dispatch(loading(FETCH_USER_ADDRESS, false));
    dispatch(fetchUserAddressAction('ERROR', error.response.data));
  }
};

export default fetchUserAddress;
