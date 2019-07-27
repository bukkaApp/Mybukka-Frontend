import { SEND_VERIFACTION_CODE } from 'Redux/actionTypes';
import AuthService from 'Utilities/authServices';
import loading from 'Redux/loading';
import axios from 'Redux/axios';
import swal from 'sweetalert';

const sendVerificationCodeAction = (type, data) => ({
  type: `${SEND_VERIFACTION_CODE}_${type}`,
  data,
});

const sendVerificationCode = (data, callback) => async (dispatch) => {
  try {
    dispatch(loading(SEND_VERIFACTION_CODE, true));
    const request = await axios({
      method: 'POST',
      url: '/user/verify-phone',
      data,
      headers: {
        authorization: AuthService.getToken(),
        accept: 'application/json',
      },
    });
    dispatch(sendVerificationCodeAction('SUCCESS', request.data));
    dispatch(loading(SEND_VERIFACTION_CODE, false));
    callback();
  } catch (error) {
    dispatch(loading(SEND_VERIFACTION_CODE, false));
    dispatch(sendVerificationCodeAction('ERROR', error.response.data));
    swal({
      title: 'Error',
      text: error.response.data.message,
      dangerMode: true
    });
  }
};

export default sendVerificationCode;
