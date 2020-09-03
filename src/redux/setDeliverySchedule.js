import { SET_DELIVERY_SCHEDULE } from 'Redux/actionTypes';

const setDeliverySchedule = ({ day, time }) => dispatch =>
  dispatch({ type: SET_DELIVERY_SCHEDULE, time, day });

export default setDeliverySchedule;
