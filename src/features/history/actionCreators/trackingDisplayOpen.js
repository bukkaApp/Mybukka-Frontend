import { DISPLAY_TRACKING } from 'Redux/actionTypes';

import loading from 'Redux/loading';

const trackingDisplayOpenAction = (type, data) => ({
  type: `${DISPLAY_TRACKING}_${type}`,
  data
});

const trackingDisplayOpen = status => async (dispatch) => {
  dispatch(loading(DISPLAY_TRACKING, true));
  dispatch(trackingDisplayOpenAction('OPEN', status));
  dispatch(loading(DISPLAY_TRACKING, false));
};

export default trackingDisplayOpen;
