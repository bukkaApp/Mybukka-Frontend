import { SET_PROMOTION_TO_DISPLAY } from 'Redux/actionTypes';

const setPromotionToDisplayAction = (slug, name, description) => dispatch => dispatch({
  type: SET_PROMOTION_TO_DISPLAY,
  slug,
  name,
  description,
});

export default setPromotionToDisplayAction;
