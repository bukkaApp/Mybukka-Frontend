import { PRIMARY_NAV_AUTH } from 'Redux/actionTypes';

const navigateAuth = (type, data) => ({
  type: `${PRIMARY_NAV_AUTH}_${type}`,
  data,
});

const changeAuthenticationPage = data => dispatch => dispatch(navigateAuth('SUCCESS', data));

export default changeAuthenticationPage;
