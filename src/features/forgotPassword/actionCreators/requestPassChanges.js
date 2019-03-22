import { REQUEST_PASSWORD_CHANGE } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const requestPassChangesAction = (type, data) => ({
  type: `${REQUEST_PASSWORD_CHANGE}_${type}`,
  data,
});

const requestPassChanges = (url, data) => async (dispatch) => {
  try {
    dispatch(loading(REQUEST_PASSWORD_CHANGE, true));
    const request = await axios.post(url, data);
    dispatch(requestPassChangesAction('SUCCESS', request.data));
    dispatch(loading(REQUEST_PASSWORD_CHANGE, false));
  } catch (error) {
    dispatch(loading(REQUEST_PASSWORD_CHANGE, false));
    dispatch(requestPassChangesAction('ERROR', error.response.data));
  }
};

export default requestPassChanges;
