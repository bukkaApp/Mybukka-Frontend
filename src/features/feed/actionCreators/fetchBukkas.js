import { FETCH_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const fetchBukkasAction = (type, data) => ({
  type: `${FETCH_BUKKAS}_${type}`,
  data
});

const fetchBukkas = (
  coordinates,
  cb = () => {},
  page = 1,
  limit = 12,
  by = 'majorCusine',
  value = '',
  type = 'food',
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKAS, true));
    const request = await axiosInstance.get(
      `/bukka/nearby?longitude=${coordinates[0]}&lattitude=${
        coordinates[1]
      }&page=${page}&limit=${limit}&by=${by}&value=${value}&type=${type}`
    );
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(fetchBukkasAction('SUCCESS', request.data));
    // cb('/feed');
  } catch (error) {
    dispatch(loading(FETCH_BUKKAS, false));
    if (!error.response) {
      dispatch(loading(FETCH_BUKKAS, false));
    } else { cb('/coming-soon'); }
    dispatch(fetchBukkasAction('ERROR', error.response ? error.response.data : error));
  }
};

export default fetchBukkas;
