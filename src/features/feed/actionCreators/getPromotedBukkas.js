import { FETCH_PROMOTED_BUKKAS } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import loading from 'Redux/loading';

const getPromotedBukkasAction = (type, data) => ({
  type: `${FETCH_PROMOTED_BUKKAS}_${type}`,
  data
});

const getPromotedBukkas = coordinates => async (dispatch) => {
  try {
    dispatch(loading(FETCH_PROMOTED_BUKKAS, true));
    const request = await axiosInstance.get(
      `/place-group/items?longitude=${
        coordinates[0]}&lattitude=${coordinates[1]}`);
    dispatch(loading(FETCH_PROMOTED_BUKKAS, false));
    dispatch(getPromotedBukkasAction('SUCCESS', request.data));
  } catch (error) {
    dispatch(loading(FETCH_PROMOTED_BUKKAS, false));
    dispatch(getPromotedBukkasAction('ERROR', error.response.data));
  }
};

export default getPromotedBukkas;
