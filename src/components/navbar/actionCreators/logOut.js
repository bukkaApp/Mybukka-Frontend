import { UNAUTHENTICATE_USER, AUTHENTICATE_USER } from 'Redux/actionTypes';

import loading from 'Redux/loading';
import timeEngine from '../../../utils/timeEngine';
import authServices from '../../../utils/authServices';

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
  setTimeout(async () => {
    await timeEngine.resetPhoneVericationPrompt();
    await authServices.removeToken();
    unAuthenticateUserAction(true);
    dispatch(authenticateUserAction('ERROR', ''));
    dispatch(loading(UNAUTHENTICATE_USER, false));
    if (cb) return cb();
  }, 1000);
};

export default unAuthenticateUser;
