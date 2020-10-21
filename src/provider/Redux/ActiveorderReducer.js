import {
  ADD_ITEM_TO_PENDING,
  CLEAR_CURRENTVIEW,
  IS_PENDING,
} from 'Redux/actionTypes';
import {
  UPDATE_ITEM_STATE,
  REMOVE_ITEM_FROM_PENDING,
} from './../../redux/actionTypes';

const initialState = {
  items: [],
  isPending: true,
  currentView: {},
};

const activeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_PENDING: {
      return {
        ...state,
        items: [...state.items, ...[action.order]],
        currentView: { ...action.order },
      };
    }
    case CLEAR_CURRENTVIEW:
      return { ...state, currentView: {} };
    case IS_PENDING: {
      return { ...state, isPending: action.pending };
    }
    case REMOVE_ITEM_FROM_PENDING:
      let shouldUpdateCurrentView = state.currentView._id === action.orderId;
      // const itemToRemove =
      //   shouldUpdateCurrentView &&
      //   state.items.find((item) => item._id === action.orderId);
      const filtered = state.items.filter(
        (item) => item._id !== action.orderId
      );
      const pending = filtered.length === 0 ? false : true;
      return {
        ...state,
        items: filtered,
        isPending: pending,
        currentView: pending
          ? shouldUpdateCurrentView
            ? {}
            : state.currentView
          : {},
      };
    case UPDATE_ITEM_STATE:
      const newItems = state.items.filter(
        (item) => item._id !== action.order._id
      );

      shouldUpdateCurrentView = state.currentView._id === action.order._id;
      return {
        ...state,
        items: [...newItems, action.order],
        currentView: shouldUpdateCurrentView && { ...action.order },
      };
    default: {
      return state;
    }
  }
};

export default activeOrderReducer;
