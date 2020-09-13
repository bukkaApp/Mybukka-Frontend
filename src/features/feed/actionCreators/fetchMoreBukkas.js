import { FETCH_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const fetchMoreBukkasAction = (type, data) => ({
  type: `${FETCH_BUKKAS}_${type}`,
  data,
});

const fetchMoreBukkas = (
  coordinates,
  page = 1,
  limit = 12,
  by = 'majorCusine',
  value = '',
  type = 'food'
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKAS, true));
    const request = await axiosInstance
      .init()
      .get(
        `/bukka/nearby?longitude=${coordinates[0]}&lattitude=${coordinates[1]}&page=${page}&limit=${limit}&by=${by}&value=${value}&type=${type}`
      );
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(fetchMoreBukkasAction('PAGINATE_SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_BUKKAS, false));
    dispatch(
      fetchMoreBukkasAction(
        'PAGINATE_ERROR',
        error.response ? error.response.data : error
      )
    );
  }
};

export default fetchMoreBukkas;
