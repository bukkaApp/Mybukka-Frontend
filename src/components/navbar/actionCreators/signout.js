import { UNAUTHENTICATE_USER, AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

const unAuthenticateUserAction = (type, data) => ({
  type: `${UNAUTHENTICATE_USER}_${type}`,
  data,
});

const authenticateUserAction = (type, data) => ({
  type: `${AUTHENTICATE_USER}_${type}`,
  data,
});

const unAuthenticateUser = cb => (dispatch) => {
  dispatch(loading(UNAUTHENTICATE_USER, true));
  setTimeout(() => {
    localStorage.removeItem('x-access-token');
    unAuthenticateUserAction(true);
    dispatch(authenticateUserAction('ERROR', ''));
    dispatch(loading(UNAUTHENTICATE_USER, false));
    if (cb) return cb();
  }, 1000);
};

export default unAuthenticateUser;
