import { FETCH_BUKKA_MENU } from 'Redux/actionTypes';

import loading from 'Redux/loading';
import alertMessage from 'Redux/alertMessage';
import axios from 'Redux/axios';

const fetchBukkaMenu = (type, data) => ({
  type: `${FETCH_BUKKA_MENU}_${type}`,
  data,
});

const fetchBukkaMenuAction = (bukka, type = 'food') => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKA_MENU, true));
    const request = await axios.get(`/menu/${bukka}?type=${type}`);
    dispatch(loading(FETCH_BUKKA_MENU, false));
    dispatch(fetchBukkaMenu('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKA_MENU, false));
    const errMsg = 'restaurant is unavailable for delivery';
    dispatch(alertMessage(FETCH_BUKKA_MENU, true, errMsg));
    dispatch(fetchBukkaMenu('ERROR', error.response.data));
  }
};

export default fetchBukkaMenuAction;
