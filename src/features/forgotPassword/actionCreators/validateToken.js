import { VALIDATE_USER_TOKEN } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const validateTokenAction = (type, data) => ({
  type: `${VALIDATE_USER_TOKEN}_${type}`,
  data,
});

const validateToken = (url, token) => async (dispatch) => {
  try {
    dispatch(loading(VALIDATE_USER_TOKEN, true));
    const request = await axios({
      method: 'GET',
      url,
      headers: {
        authorization: token,
        accept: 'application/json'
      }
    });
    dispatch(validateTokenAction('SUCCESS', request.data));
    dispatch(loading(VALIDATE_USER_TOKEN, false));
  } catch (error) {
    dispatch(loading(VALIDATE_USER_TOKEN, false));
    dispatch(validateTokenAction('ERROR', error.response.data));
  }
};

export default validateToken;
