import { SHOW_LOADER } from 'Redux/actionTypes';

import loading from 'Redux/loading';

const showLoadingAction = () => dispatch => dispatch(loading(SHOW_LOADER, true));

export default showLoadingAction;
