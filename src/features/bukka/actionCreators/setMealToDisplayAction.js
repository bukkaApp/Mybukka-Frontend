import { SET_MEAL_TO_DISPLAY } from 'Redux/actionTypes';

const setMealToDisplayAction = (slug, isCart) => dispatch => dispatch({
  type: SET_MEAL_TO_DISPLAY,
  slug,
  isCart,
});

export default setMealToDisplayAction;
