import { HIDE_LOADER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

const hideLoadingAction = () => dispatch => dispatch(loading(HIDE_LOADER, false));

export default hideLoadingAction;
