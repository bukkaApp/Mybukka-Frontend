/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import swal from 'sweetalert';
import moment from 'moment';
import { sortOrdersUpdate, flatArr } from '../../utils/cartUtils';
// import handleOrderQuantity from '../../utils/handleOrderQuantity';

const initialState = {
  items: [],
  item: {},
  sub_menus: {
    mealSlug: '',
    submenus: []
  },
  initialTime: 0,
  totalCost: 0,
  status: {
    updated: false,
    error: false
  },
  errorMessage: ''
};

const handleSubmenusPrice = (cartItems) => {
  let total = 0;
  cartItems.map((eachItem) => {
    if (eachItem.submenus.length > 0) {
      for (let i = 0; i < eachItem.submenus.length; i++) {
        for (let k = 0; k < eachItem.submenus[i].options.length; k++) {
          total += eachItem.submenus[i].options[k].price * eachItem.quantity;
        }
      }
    }
  });
  return total;
};


const calculatePrice = (cartItems) => {
  if (cartItems.length === 0) {
    return 0;
  }
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price * item.quantity).reduce(add);
  return handleSubmenusPrice(cartItems) + totalPrice;
};

const createLocalCart = (state, newItems, newTime) => ({
  ...state,
  initialTime: newTime || state.initialTime,
  items: newItems,
  totalCost: calculatePrice(newItems || []),
  errorMessage: '',
});

const cartUpdateSuccess = (userCart) => {
  // const uniqueCart = {};
  let uniqueCarts = [];
  userCart.items.map((myCart) => {
    const item = { ...myCart, ...myCart.meal };
    const uniqueIds = flatArr(item.submenus);
    console.log('uniqueCarts', uniqueCarts, 'item', item, 'uniqueIds', uniqueIds);
    uniqueCarts = sortOrdersUpdate(uniqueCarts, item);
    return item;
  });

  const newCart = uniqueCarts;
  return {
    items: newCart,
    totalCost: calculatePrice(newCart),
    status: {
      updated: true,
      error: false
    },
    errorMessage: ''
  };
};

const cartUpdateError = (state, message, isEmpty) => ({
  ...state,
  items: isEmpty ? [] : state.items,
  status: {
    updated: false,
    error: true
  },
  errorMessage: message || 'an error occured'
});


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CART_SUCCESS': {
      const { userCart } = action.data;
      return cartUpdateSuccess(userCart || { items: [] }, state);
    }

    case 'FETCH_CART_ERROR': {
      const { message } = action.data;
      return cartUpdateError(state, message, true);
    }

    case 'UPDATE_CART_SUCCESS': {
      const { updatedCart } = action.data;
      return cartUpdateSuccess(updatedCart, state);
    }

    case 'UPDATE_CART_LOCAL': {
      const initialTime = state.initialTime;
      const currTime = moment(new Date());
      if (typeof initialTime !== 'number' && currTime.diff(initialTime) >= 43200000) {
        return {
          ...state,
          initialTime: 0,
          items: [],
          item: {},
          totalCost: 0
        };
      }
      if (state.items.length > 0 && action.data.bukka !== state.items[0].bukka) {
        swal('your cart can only contain items of a single bukka at any given time');
        return {
          ...state,
          errorMessage: 'your cart can only contain items of a single bukka at any given time',
        };
      }
      const item = { ...action.data, meal: action.data, quantity: 1 };
      if (state.items.length > 0) {
        const orders = sortOrdersUpdate(state.items, item);
        return createLocalCart(state, orders);
      }
      return createLocalCart(state, [item], currTime);
    }

    case 'UPDATE_CART_REMOVE': {
      const newItems = state.items.filter((items, index) => index !== action.index);
      return {
        ...state,
        items: newItems,
        totalCost: calculatePrice(newItems || []),
      };
    }

    case 'UPDATE_CART_ERROR': {
      const { message } = action.data;
      return cartUpdateError(state, message);
    }

    case 'FINISH_CHARGE_TRANSACTION_SUCCESS': {
      return {
        ...state,
        ...initialState,
      };
    }

    default: {
      const initialTime = state.initialTime;
      const currTime = moment(new Date());
      if (typeof initialTime !== 'number' && currTime.diff(initialTime) >= 43200000) {
        return {
          ...state,
          initialTime: 0,
          items: [],
          item: {},
          totalCost: 0
        };
      }
      return state;
    }
  }
};

export default cartReducer;
