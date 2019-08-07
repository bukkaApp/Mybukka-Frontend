import { FETCH_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import alertMessage from 'Redux/alertMessage';
import loading from 'Redux/loading';

const fetchBukkasAction = (type, data) => ({
  type: `${FETCH_BUKKAS}_${type}`,
  data
});

const fetchBukkas = (
  coordinates,
  page = 1,
  limit = 12,
  by = 'majorCusine',
  value = '',
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKAS, true));
    const request = await axiosInstance.get(
      `/bukka/nearby?longitude=${coordinates[0]}&lattitude=${
        coordinates[1]
      }&page=${page}&limit=${limit}&by=${by}&value=${value}`
    );
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(fetchBukkasAction('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKAS, false));
    if (!error.response) {
      dispatch(alertMessage(FETCH_BUKKAS, true, 'Sorry, Server maintaince is going on, try again later'));
      dispatch(loading(FETCH_BUKKAS, false));
    }
    dispatch(fetchBukkasAction('ERROR', error.response.data));
  }
};

export default fetchBukkas;
