import { SEND_CONTACT } from 'Redux/actionTypes';
import AuthService from 'Utilities/authServices';
import loading from 'Redux/loading';
import axios from 'Redux/axios';
import swal from 'sweetalert';

const sendContactAction = (type, data) => ({
  type: `${SEND_CONTACT}_${type}`,
  data,
});

const sendContact = (data, callback) => async (dispatch) => {
  let request;
  try {
    dispatch(loading(SEND_CONTACT, true));
    request = await axios({
      method: 'POST',
      url: '/user/send-code',
      data,
      headers: {
        authorization: AuthService.getToken(),
        accept: 'application/json',
      },
    });
    dispatch(sendContactAction('SUCCESS', request.data));
    dispatch(loading(SEND_CONTACT, false));
    if (callback) callback();
  } catch (error) {
    dispatch(loading(SEND_CONTACT, false));
    dispatch(sendContactAction('ERROR', error.response.data));
    swal({
      title: 'Error',
      text: error.response.data.message,
      dangerMode: true
    });
  }
  return request;
};

export default sendContact;
