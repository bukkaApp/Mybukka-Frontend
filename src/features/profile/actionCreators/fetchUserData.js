import { FETCH_USER_DATA } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';


const fetchUserDataAction = (type, data) => ({
  type: `${FETCH_USER_DATA}_${type}`,
  data,
});

const fetchUserData = () => async (dispatch) => {
  let request;
  try {
    dispatch(loading(FETCH_USER_DATA, true));
    request = await axios({
      method: 'GET',
      url: '/user/profile',
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      },
    });
    dispatch(fetchUserDataAction('SUCCESS', request.data));
    dispatch(loading(FETCH_USER_DATA, false));
  } catch (error) {
    dispatch(loading(FETCH_USER_DATA, false));
    dispatch(fetchUserDataAction('ERROR', error.response ? error.response.data : error));
  }
  return request;
};

export default fetchUserData;
