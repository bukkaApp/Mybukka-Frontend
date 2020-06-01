import { POST_USER_ADDRESS } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const postUserAddressAction = (type, data) => ({
  type: `${POST_USER_ADDRESS}_${type}`,
  data,
});

const postUserAddress = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(POST_USER_ADDRESS, true));
    const request = await axios({
      method: 'POST',
      url,
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      }
    });
    dispatch(postUserAddressAction('SUCCESS', request.data));
    dispatch(loading(POST_USER_ADDRESS, false));
  } catch (error) {
    dispatch(postUserAddressAction('ERROR', error.response ? error.response.data : error));
    dispatch(loading(POST_USER_ADDRESS, false));
  }
};

export default postUserAddress;
