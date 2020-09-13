import { FETCH_RESTAURANTS_CUISINES } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getRestaurantCuisineAction = (type, data) => ({
  type: `${FETCH_RESTAURANTS_CUISINES}_${type}`,
  data,
});

const getRestaurantCuisine = (coordinates) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_RESTAURANTS_CUISINES, true));
    const request = await axiosInstance
      .init()
      .get(
        `/cuisine/items?longitude=${coordinates[0]}&lattitude=${coordinates[1]}`
      );
    dispatch(loading(FETCH_RESTAURANTS_CUISINES, false));
    dispatch(getRestaurantCuisineAction('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_RESTAURANTS_CUISINES, false));
    dispatch(getRestaurantCuisineAction('ERROR', error.response.data));
  }
};

export default getRestaurantCuisine;
