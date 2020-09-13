import { FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getMoreBukkasRelatedToSingleCuisinesAction = (
  type,
  data,
  currentPage
) => ({
  type: `${FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE}_${type}`,
  data,
  currentPage,
});

const getMoreBukkasRelatedToSingleCuisines = (
  id,
  coordinates,
  page = 1,
  limit = 10
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE, true));
    const request = await axiosInstance
      .init()
      .get(
        `/cuisine/items/${id}?longitude=${coordinates[0]}&lattitude=${coordinates[1]}&page=${page}&limit=${limit}`
      );
    dispatch(loading(FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE, false));
    dispatch(
      getMoreBukkasRelatedToSingleCuisinesAction('SUCCESS', request.data, page)
    );
  } catch (error) {
    dispatch(loading(FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE, false));
    dispatch(
      getMoreBukkasRelatedToSingleCuisinesAction('ERROR', error.response.data)
    );
  }
};

export default getMoreBukkasRelatedToSingleCuisines;
