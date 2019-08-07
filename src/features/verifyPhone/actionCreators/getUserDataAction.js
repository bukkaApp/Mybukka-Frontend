import { GET_USER_DATA } from 'Redux/actionTypes';
import AuthService from 'Utilities/authServices';
import loading from 'Redux/loading';
import axios from 'Redux/axios';

const getUserAction = (type, data) => ({
  type: `${GET_USER_DATA}_${type}`,
  data,
});

const getUser = () => async (dispatch) => {
  try {
    dispatch(loading(GET_USER_DATA, true));
    const request = await axios({
      method: 'GET',
      url: '/user/profile',
      headers: {
        authorization: AuthService.getToken(),
        accept: 'application/json',
      },
    });
    dispatch(getUserAction('SUCCESS', request.data.userInfo));
    dispatch(loading(GET_USER_DATA, false));
  } catch (error) {
    dispatch(loading(GET_USER_DATA, false));
    dispatch(getUserAction('ERROR', error.response.data));
  }
};

export default getUser;
