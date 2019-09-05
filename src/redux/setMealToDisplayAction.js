import { SET_MEAL_TO_DISPLAY } from 'Redux/actionTypes';

const setMealToDisplayAction = (slug, isCart, modalShow) => dispatch => dispatch({
  type: SET_MEAL_TO_DISPLAY,
  slug,
  isCart,
  modalShow,
});

export default setMealToDisplayAction;
