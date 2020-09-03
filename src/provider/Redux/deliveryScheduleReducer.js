const initialState = {
  mode: 'asap',
  schedule: {
    day: 'Today',
    time: 'ASAP',
  },
};

const deliveryScheduleReducer = (state = initialState, action) => {
  const { type, day, time } = action;
  switch (type) {
    case 'SET_DELIVERY_SCHEDULE': {
      if (day === 'Today' && time === 'ASAP') {
        return initialState;
      }
      return {
        mode: 'schedule',
        schedule: {
          day,
          time,
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default deliveryScheduleReducer;
