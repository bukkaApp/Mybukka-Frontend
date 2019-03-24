import { DISPLAY_TRACKING } from 'Redux/actionTypes';

import loading from 'Redux/loading';

const trackingDisplayCloseAction = type => ({
  type: `${DISPLAY_TRACKING}_${type}`,
});

const trackingDisplayClose = () => async (dispatch) => {
  dispatch(loading(DISPLAY_TRACKING, true));
  dispatch(trackingDisplayCloseAction('CLOSE'));
  dispatch(loading(DISPLAY_TRACKING, false));
};

export default trackingDisplayClose;
