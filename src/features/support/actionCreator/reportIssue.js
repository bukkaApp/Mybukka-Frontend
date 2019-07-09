import { REPORT_ISSUE } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'Redux/axios';

const reportIssueAction = (type, data) => ({
  type: `${REPORT_ISSUE}_${type}`,
  data,
});

const reportIssue = data => async (dispatch) => {
  try {
    dispatch(loading(REPORT_ISSUE, true));
    const request = await axios({
      method: 'POST',
      url: '/user/comment',
      data,
      headers: {
        authorization: localStorage.getItem('x-access-token'),
        accept: 'application/json'
      }
    });
    dispatch(reportIssueAction('SUCCESS', request.data));
    dispatch(loading(REPORT_ISSUE, false));
  } catch (error) {
    dispatch(loading(REPORT_ISSUE, false));
    dispatch(reportIssueAction('ERROR', error.response.data));
  }
};

export default reportIssue;
