import { FETCH_NEAREST_MART_OR_FRESH } from 'Redux/actionTypes';
import axiosInstance from 'Redux/axios';
import alertMessage from 'Redux/alertMessage';
import loading from 'Redux/loading';

const fetchNearestMartOrFreshAction = (type, data) => ({
  type: `${FETCH_NEAREST_MART_OR_FRESH}_${type}`,
  data
});

const fetchNearestMartOrFresh = (
  coordinates,
  cb = () => {},
  type,
  by = 'majorCusine',
  value = '',
) => async (dispatch) => {
  try {
    dispatch(loading(FETCH_NEAREST_MART_OR_FRESH, true));
    const request = await axiosInstance.get(
      `/bukka/nearby?longitude=${coordinates[0]}&lattitude=${
        coordinates[1]
      }&type=${type}`
    );
    dispatch(loading(FETCH_NEAREST_MART_OR_FRESH, false));
    dispatch(fetchNearestMartOrFreshAction('SUCCESS', request.data));
    // cb('/feed');
  } catch (error) {
    dispatch(loading(FETCH_NEAREST_MART_OR_FRESH, false));
    if (!error.response) {
      dispatch(alertMessage(FETCH_NEAREST_MART_OR_FRESH, true, 'Please check your network'));
      dispatch(loading(FETCH_NEAREST_MART_OR_FRESH, false));
    } else { cb('/coming-soon'); }
    dispatch(fetchNearestMartOrFreshAction('ERROR', error.response.data));
  }
};

export default fetchNearestMartOrFresh;
