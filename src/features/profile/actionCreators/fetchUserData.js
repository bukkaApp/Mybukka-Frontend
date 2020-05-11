import { FETCH_USER_DATA } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';


const fetchUserDataAction = (type, data) => ({
  type: `${FETCH_USER_DATA}_${type}`,
  data,
});

const fetchUserData = url => async (dispatch) => {
  console.log('url', url);
  try {
    dispatch(loading(FETCH_USER_DATA, true));
    const request = await axios({
      method: 'GET',
      url,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json',
      },
    });
    dispatch(fetchUserDataAction('SUCCESS', request.data));
    dispatch(loading(FETCH_USER_DATA, false));
  } catch (error) {
    dispatch(loading(FETCH_USER_DATA, false));
    dispatch(fetchUserDataAction('ERROR', error.response.data));
  }
};

export default fetchUserData;
