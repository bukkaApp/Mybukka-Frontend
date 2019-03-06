import { FETCH_USER_DATA } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const fetchUserDataAction = (type, data) => ({
  type: `${FETCH_USER_DATA}_${type}`,
  data,
});

const fetchUserData = url => async (dispatch) => {
  try {
    dispatch(loading(FETCH_USER_DATA, true));
    const request = await axios.get(url);
    dispatch(fetchUserDataAction('SUCCESS', request.data));
    dispatch(loading(FETCH_USER_DATA, false));
  } catch (error) {
    dispatch(fetchUserDataAction('ERROR', error.response.data));
    dispatch(loading(FETCH_USER_DATA, false));
  }
};

export default fetchUserData;
