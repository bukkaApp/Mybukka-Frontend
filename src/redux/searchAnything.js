import { SEARCH_ANYTHING } from 'Redux/actionTypes';

export const emptySearchData = () => dispatch => dispatch({
  type: `${SEARCH_ANYTHING}_REMOVE`
});

const searchAnything = data => dispatch => dispatch({
  type: `${SEARCH_ANYTHING}_ADD`,
  data,
});

export default searchAnything;
