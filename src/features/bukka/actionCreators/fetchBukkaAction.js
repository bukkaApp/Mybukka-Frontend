import { FETCH_BUKKA } from 'Redux/actionTypes';

import loading from 'Redux/loading';
import axios from 'Redux/axios';

const fetchBukka = (type, data) => ({
  type: `${FETCH_BUKKA}_${type}`,
  data,
});

const fetchBukkaAction = bukka => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKA, true));
    const request = await axios.get(`/bukka/${bukka}`);
    dispatch(loading(FETCH_BUKKA, false));
    dispatch(fetchBukka('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKA, false));
    dispatch(fetchBukka('ERROR', error.response.data));
  }
};

export default fetchBukkaAction;
