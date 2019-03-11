import { POST_USER_DATA } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const postUserDataAction = (type, data) => ({
  type: `${POST_USER_DATA}_${type}`,
  data,
});

const postUserData = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(POST_USER_DATA, true));
    const request = await axios.put(url, data);
    dispatch(postUserDataAction('SUCCESS', request.data));
    dispatch(loading(POST_USER_DATA, false));
  } catch (error) {
    dispatch(postUserDataAction('ERROR', error.response.data));
    dispatch(loading(POST_USER_DATA, false));
  }
};

export default postUserData;
