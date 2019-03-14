const initialState = {
  bukkaMenu: [{}],
  status: {
    fetched: false,
    error: false
  },
  mealToDisplay: {},
  errorMessage: '',
  cart: []
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
      const { cart, mealToDisplay } = state;
      const menuIsAlreadyIncart =
        cart.filter(menu => menu.slug === mealToDisplay.slug).length !== 0;
      if (menuIsAlreadyIncart) return state;
      return {
        ...state,
        cart: [...cart, mealToDisplay]
      };
    }

    case 'REMOVE_FROM_CART': {
      const { slug } = action;
      const { cart } = state;
      return {
        ...state,
        cart: cart.length > 0 ? cart.filter(item => item.slug !== slug) : cart,
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
