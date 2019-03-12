import { AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const authenticateUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const authenticateUser = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(AUTHENTICATE_USER, true));
    const request = await axios.post(url, data);
    localStorage.setItem('x-access-token', request.data.token);
    dispatch(authenticateUserAction('SUCCESS', request.data));
    dispatch(loading(AUTHENTICATE_USER, false));
  } catch (error) {
    dispatch(authenticateUserAction('ERROR', error.response.data));
    dispatch(loading(AUTHENTICATE_USER, false));
  }
};

export default authenticateUser;
