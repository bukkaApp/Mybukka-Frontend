import { FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getBukkasRelatedToSingleCuisinesAction = (type, data, currentPage) => ({
  type: `${FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE}_${type}`,
  data,
  currentPage
});

const getBukkasRelatedToSingleCuisines = (
  id,
  coordinates,
  page = 1,
  limit = 10,
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE, true));
    const request = await axiosInstance.get(
      `/cuisine/items/${id}?longitude=${
        coordinates[0]}&lattitude=${coordinates[1]
      }&page=${page}&limit=${limit}`
    );
    dispatch(loading(FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE, false));
    dispatch(getBukkasRelatedToSingleCuisinesAction('SUCCESS', request.data, page));
  } catch (error) {
    dispatch(loading(FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE, false));
    dispatch(getBukkasRelatedToSingleCuisinesAction('ERROR', error.response.data));
  }
};

export default getBukkasRelatedToSingleCuisines;
