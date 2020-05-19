import { AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const authenticateUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const authenticateUser = (url, data) => async (dispatch) => {
  let request;
  try {
    dispatch(loading(AUTHENTICATE_USER, true));
    request = await axios.post(url, data);
    localStorage.setItem('x-access-token', request.data.token);
    dispatch(authenticateUserAction('SUCCESS', request.data));
    dispatch(loading(AUTHENTICATE_USER, false));
  } catch (error) {
    dispatch(loading(AUTHENTICATE_USER, false));
    dispatch(authenticateUserAction('ERROR', error.response.data));
  }
  return request;
};

export default authenticateUser;
