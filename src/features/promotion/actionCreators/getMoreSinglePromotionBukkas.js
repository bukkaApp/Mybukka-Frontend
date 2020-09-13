import { FETCH_MORE_SINGLE_PROMOTED_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getMoreSinglePromotionBukkasAction = (type, data, currentPage) => ({
  type: `${FETCH_MORE_SINGLE_PROMOTED_BUKKAS}_${type}`,
  data,
  currentPage,
});

const getMoreSinglePromotionBukkas = (
  id,
  coordinates,
  page = 1,
  limit = 15
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_MORE_SINGLE_PROMOTED_BUKKAS, true));
    const request = await axiosInstance
      .init()
      .get(
        `/place-group/items/${id}?longitude=${coordinates[0]}&lattitude=${coordinates[1]}&page=${page}&limit=${limit}`
      );
    dispatch(loading(FETCH_MORE_SINGLE_PROMOTED_BUKKAS, false));
    dispatch(getMoreSinglePromotionBukkasAction('SUCCESS', request.data, page));
  } catch (error) {
    dispatch(loading(FETCH_MORE_SINGLE_PROMOTED_BUKKAS, false));
    dispatch(
      getMoreSinglePromotionBukkasAction(
        'ERROR',
        error.response ? error.response.data : error
      )
    );
  }
};

export default getMoreSinglePromotionBukkas;
