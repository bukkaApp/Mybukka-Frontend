const { IS_PENDING, ADD_ITEM_TO_PENDING } = require('./actionTypes');

export const addPendingOrder = (pending) => ({
  type: IS_PENDING,
  pending,
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
