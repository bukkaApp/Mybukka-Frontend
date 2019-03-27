const initialState = {
  bukkaMenu: [{}],
  status: {
    fetched: false,
    error: false
  },
  mealToDisplay: {},
  errorMessage: '',
  cart: [],
  totalPriceInCart: 0
};

const manipulateMeal = ({ manipulateType }, meal, basePrice) => {
  const { quantity } = meal;
  if (manipulateType === 'reduce' && quantity > 1) {
    return {
      ...meal,
      quantity: quantity - 1,
      price: basePrice * (quantity - 1)
    };
  }
  if (manipulateType === 'increase') {
    return {
      ...meal,
      quantity: quantity + 1,
      price: basePrice * (quantity + 1)
    };
  }
  return meal;
};

const calculatePrice = (cartItems) => {
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price).reduce(add);
  return totalPrice;
};

const itemIsInCart = (slug, cart) =>
  cart.filter(menu => menu.slug === slug).length !== 0;

const addSpecifiedItemToCart = (slug, items) =>
  items.filter(item => item.slug === slug)[0];

const updateCart = (slug, bukkaMenu, cart, mealToDisplay) => {
  const updatedCart = slug
    ? [...cart, addSpecifiedItemToCart(slug, bukkaMenu, cart)]
    : [...cart, mealToDisplay];
  return updatedCart;
};

const fetchBukkaMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BUKKA_MENU_SUCCESS':
      return {
        ...state,
        bukkaMenu: action.data.bukkaMenu,
        status: {
          fetched: true,
          error: false
        },
        mealToDisplay: action.data.bukkaMenu[0],
        errorMessage: ''
      };

    case 'FETCH_BUKKA_MENU_ERROR':
      return {
        ...state,
        bukkaMenu: [{}],
        status: {
          fetched: false,
          error: true
        },
        errorMessage: action.data.message
      };

    case 'ADD_TO_CART': {
      const { cart, mealToDisplay, bukkaMenu } = state;
      const { slug } = action;
      if (!slug && itemIsInCart(mealToDisplay.slug, cart)) return state;
      if (slug && itemIsInCart(slug, cart)) return state;
      const newCart = updateCart(slug, bukkaMenu, cart, mealToDisplay);
      return {
        ...state,
        cart: newCart,
        totalPriceInCart: calculatePrice(newCart)
      };
    }

    case 'REMOVE_FROM_CART': {
      const { slug } = action;
      const { cart } = state;
      const newCart =
        cart.length > 0 ? cart.filter(item => item.slug !== slug) : cart;
      return {
        ...state,
        cart: newCart,
        totalPriceInCart: calculatePrice(newCart)
      };
    }

    case 'SET_MEAL_TO_DISPLAY': {
      const { cart, bukkaMenu } = state;
      const { isCart, slug } = action;
      const menuToFilter = isCart ? cart : bukkaMenu;
      return {
        ...state,
        mealToDisplay: {
          ...menuToFilter.filter(menu => menu.slug === slug)[0],
          quantity: 1
        }
      };
    }

    case 'MANIPULATE_MEAL': {
      const { bukkaMenu, mealToDisplay } = state;
      const basePrice = bukkaMenu.filter(
        menu => menu.slug === mealToDisplay.slug
      )[0].price;
      return {
        ...state,
        mealToDisplay: manipulateMeal(action, mealToDisplay, basePrice)
      };
    }

    default: {
      return state;
    }
  }
};

export default fetchBukkaMenuReducer;
