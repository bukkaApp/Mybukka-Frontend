import { MANIPULATE_CARD_DETAILS } from './actionTypes';

const manipulateCardDetailsAction = data => dispatch => dispatch({
  type: MANIPULATE_CARD_DETAILS,
  data,
});

export default manipulateCardDetailsAction;
