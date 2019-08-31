import { SELECT_AUTH_FORM } from 'Redux/actionTypes';

const navigateAuth = (type, data) => ({
  type: `${SELECT_AUTH_FORM}_${type}`,
  data,
});

const selectAuthForm = data => dispatch => dispatch(navigateAuth('SUCCESS', data));

export default selectAuthForm;
