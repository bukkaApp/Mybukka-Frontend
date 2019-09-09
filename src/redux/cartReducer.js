/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import swal from 'sweetalert';
import handleOrderQuantity from 'Utilities/handleOrderQuantity';

const initialState = {
  items: [],
  item: {},
  sub_menus: {
    mealSlug: '',
    submenus: []
  },
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

const createLocalCart = (state, newItems) => ({
  ...state,
  items: newItems,
  totalCost: calculatePrice(newItems || []),
  errorMessage: '',
});

const cartUpdateSuccess = (userCart, state) => {
  const item = { ...userCart.items, ...userCart.items.meal[0] };
  const newCart = [...state.items, item];
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

const cartUpdateError = (state, message) => ({
  ...state,
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
      return cartUpdateError(state, message);
    }

    case 'UPDATE_CART_SUCCESS': {
      const { items } = action.data;
      return cartUpdateSuccess(items);
    }

    case 'UPDATE_CART_LOCAL': {
      if (state.items.length > 0 && action.data.bukka !== state.items[0].bukka) {
        swal('your cart can only contain items of a single bukka at any given time');
        return {
          ...state,
          errorMessage: 'your cart can only contain items of a single bukka at any given time',
        };
      }
      const item = { ...action.data, meal: action.data, quantity: 1 };
      if (state.items.length > 0) {
        const incrementQuantity = handleOrderQuantity(state.items, item);
        console.log('incrementQuantity', incrementQuantity);
        if (incrementQuantity) {
          return createLocalCart(state, incrementQuantity);
        }
        const newItems = [...state.items, item];
        return createLocalCart(state, newItems);
      }
      const newItems = [...state.items, item];
      return createLocalCart(state, newItems);
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
        items: [],
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
