import { FETCH_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const fetchBukkasAction = (type, data) => ({
  type: `${FETCH_BUKKAS}_${type}`,
  data
});

const fetchBukkas = coordinates => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKAS, true));
    const request = await axiosInstance.get(
      `/bukka/nearby?longitude=${coordinates[0]}&lattitude=${coordinates[1]}`
    );
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(fetchBukkasAction('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(fetchBukkasAction('ERROR', error.response.data));
  }
};

export default fetchBukkas;
