import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  items: [],
  isPending: true,
  currentView: {},
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case 'ADD_ITEM_TO_PENDING': {
      return {
        ...state,
        items: [...state.items, ...[action.order]],
        currentView: { ...action.order },
      };
    }

    case 'IS_PENDING': {
      return { ...state, isPending: action.pending };
    }
    case 'REMOVE_ITEM_FROM_PENDING':
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
    case 'UPDATE_ITEM_STATE':
      const newItems = state.items.filter(
        (item) => item._id !== action.order._id
      );

      shouldUpdateCurrentView = state.currentView._id === action.order._id;
      return {
        ...state,
        items: { ...newItems, ...action.order },
        currentView: shouldUpdateCurrentView && { ...action.order },
      };
    default: {
      return state;
    }
  }
};
const loggerReducer = logger(reducer);

const usePending = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const addPendingOrder = (pending) =>
    dispatch({
      type: 'IS_PENDING',
      pending,
    });

  const addItem = (order) =>
    dispatch({
      type: 'ADD_ITEM_TO_PENDING',
      order,
    });
  const removeItem = (orderId) => {
    dispatch({
      type: 'REMOVE_ITEM_FROM_PENDING',
      orderId,
    });
  };
  const updateItem = (order) => {
    dispatch({
      type: 'UPDATE_ITEM_STATE',
      order,
    });
  };

  const { isPending, items, currentView } = state;

  return {
    isPending,
    items,
    currentView,
    removeItem,
    addItem,
    addPendingOrder,
    updateItem,
  };
};

export const [PendingProvider, usePendingOrderContext] = constate(usePending);
