import { POST_USER_ADDRESS } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const fetchUserDataAction = (type, data) => ({
  type: `${POST_USER_ADDRESS}_${type}`,
  data,
});

const fetchUserData = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(POST_USER_ADDRESS, true));
    const request = await axios.post(url, data);
    dispatch(fetchUserDataAction('SUCCESS', request.data));
    dispatch(loading(POST_USER_ADDRESS, false));
  } catch (error) {
    dispatch(fetchUserDataAction('ERROR', error.response.data));
    dispatch(loading(POST_USER_ADDRESS, false));
  }
};

export default fetchUserData;
