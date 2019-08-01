import axios from 'Redux/axios';
import loading from 'Redux/loading';
import alertMessage from 'Redux/alertMessage';

import { SET_DEFAULT_CARD } from 'Redux/actionTypes';

const setDefaultCardAction = (status, data) => ({
  type: `${SET_DEFAULT_CARD}_${status}`,
  data
});

/**
 * @function setDefaultCard
 * @param {*} currentSelection get new selected id
 * @returns {void}
 */
const setDefaultCard = currentSelection =>
  async (dispatch) => {
    try {
      dispatch(loading(SET_DEFAULT_CARD, true));
      const response = await axios({
        method: 'POST',
        url: `/card/${currentSelection}`,
        headers: {
          authorization: localStorage.getItem('x-access-token'),
          accept: 'application/json'
        }
      });
      dispatch(setDefaultCardAction('SUCCESS', response.data));
      dispatch(alertMessage(SET_DEFAULT_CARD, true, response.data.message));
      dispatch(loading(SET_DEFAULT_CARD, false));
    } catch (error) {
      dispatch(loading(SET_DEFAULT_CARD, false));
      dispatch(setDefaultCardAction('ERROR', error.response.data));
    }
  };

export default setDefaultCard;
