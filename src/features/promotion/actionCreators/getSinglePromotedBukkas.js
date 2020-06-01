import { FETCH_SINGLE_PROMOTED_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getSinglePromotedBukkasAction = (type, data, currentPage) => ({
  type: `${FETCH_SINGLE_PROMOTED_BUKKAS}_${type}`,
  data,
  currentPage
});

const getSinglePromotedBukkas = (
  id,
  coordinates,
  page = 1,
  limit = 10,
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_SINGLE_PROMOTED_BUKKAS, true));
    const request = await axiosInstance.get(
      `/place-group/items/${id}?longitude=${
        coordinates[0]}&lattitude=${coordinates[1]
      }&page=${page}&limit=${limit}`
    );
    dispatch(loading(FETCH_SINGLE_PROMOTED_BUKKAS, false));
    dispatch(getSinglePromotedBukkasAction('SUCCESS', request.data, page));
  } catch (error) {
    dispatch(loading(FETCH_SINGLE_PROMOTED_BUKKAS, false));
    dispatch(getSinglePromotedBukkasAction('ERROR', error.response ? error.response.data : error));
  }
};

export default getSinglePromotedBukkas;
