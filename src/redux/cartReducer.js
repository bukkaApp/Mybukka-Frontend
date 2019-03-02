const initialState = {
  items: [],
  totalCost: 0,
  status: {
    updated: false,
    error: false
  },
  errorMessage: ''
};

const calculatePrice = (cartItems) => {
  if (cartItems.length === 0) {
    return 0;
  }
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price).reduce(add);
  return totalPrice;
};

const cartUpdateSuccess = (userCart, state) => {
  const newCart = [...state.items, userCart.items];
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
        return {
          ...state,
          errorMessage: 'your cart can only contain items of a single bukka at any given time',
        };
      }
      const newItems = [...state.items, action.data];
      return {
        ...state,
        items: newItems,
        totalCost: calculatePrice(newItems || []),
        errorMessage: '',
      };
    }

    case 'UPDATE_CART_REMOVE': {
      const newItems = state.items.filter(items => items.slug !== action.slug);
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

    default: {
      return state;
    }
  }
};

export default cartReducer;
