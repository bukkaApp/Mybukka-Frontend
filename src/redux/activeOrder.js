const {
  IS_PENDING,
  ADD_ITEM_TO_PENDING,
  UPDATE_ITEM_STATE,
  REMOVE_ITEM_FROM_PENDING,
  CLEAR_CURRENTVIEW,
} = require('./actionTypes');

export const addPendingOrder = (pending) => ({
  type: IS_PENDING,
  pending,
});

export const clearCurrentView = () => ({
  type: CLEAR_CURRENTVIEW,
});

export const addItem = (order) => ({
  type: ADD_ITEM_TO_PENDING,
  order,
});
export const removeItem = (orderId) => ({
  type: REMOVE_ITEM_FROM_PENDING,
  orderId,
});
export const updateItem = (order) => ({
  type: UPDATE_ITEM_STATE,
  order,
});
