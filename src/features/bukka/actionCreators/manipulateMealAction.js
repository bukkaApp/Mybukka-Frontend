import { MANIPULATE_MEAL } from 'Redux/actionTypes';

const manipulateMealAction = manipulateType => dispatch => dispatch({
  type: MANIPULATE_MEAL,
  manipulateType,
});

export default manipulateMealAction;
