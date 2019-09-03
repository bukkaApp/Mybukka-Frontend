/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import swal from 'sweetalert';

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

const calculatePrice = (cartItems) => {
  if (cartItems.length === 0) {
    return 0;
  }
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price).reduce(add);
  return totalPrice;
};

const updateSubmenus = (eachSubmenuId, submenus = [], itemId) => {
  const updatedSubmenu = [];
  for (let i = 0; i < submenus.length; i++) {
    if (submenus[i]._id === eachSubmenuId) {
      const subMenuOption = submenus[i]
        .options.filter(option => (option._id === itemId));
        // push new submenu
      updatedSubmenu.push({
        ...submenus[i],
        options: subMenuOption,
      });
    }
  }
  return updatedSubmenu;
};

const filterSubmenus = (initialSubmenus, currentSubMenu) => {
  const filteredSubmenu = [];
  for (let i = 0; i < initialSubmenus.length; i++) {
    if (initialSubmenus[i]._id === currentSubMenu[0]._id) {
      const subMenuLeft = initialSubmenus[i].options
        .filter(option => option._id !== currentSubMenu[0].options[0]._id);
      if (subMenuLeft.length < initialSubmenus[i].options.length) {
        filteredSubmenu.push({
          ...initialSubmenus[i],
          options: subMenuLeft,
        });
      } else {
        filteredSubmenu.push({
          ...initialSubmenus[i],
          options: [...initialSubmenus[i].options, ...currentSubMenu[0].options],
        });
      }
    }
  }
  return filteredSubmenu;
};

const manipulateSubmenus = (state, submenu, mealSlug) => {
  const { sub_menus: { submenus } } = state;
  if (submenus.length === 0) return { ...state, sub_menus: { submenus: submenu, mealSlug } };//eslint-disable-line
  const manipulatedSubmenus = filterSubmenus(submenus, submenu);
  return { ...state, sub_menus: { submenus: manipulatedSubmenus, mealSlug } };
};

const loopThroughRequiredSubmenuAndInitialSubmenus = (current, initial, reverse) => {
  const data = [];
  for (let i = 0; i < current.length; i++) {
    for (let k = 0; k < initial.length; k++) {
      const reverseComparison = reverse ? initial[k]._id !== current[i]._id
        : current[i]._id !== initial[k]._id;
      if (reverseComparison) {
        data.push(current[i]);
      }
    }
  }
  console.log(current, initial, 'data', data);
  return data;
};

const promptForRequiredSubmenus = (data, state) => {
  const { sub_menus: { submenus } } = state;
  const requiredItems = data
    .submenus.filter(option => option.isRequired);
  if (submenus.length === 0) return requiredItems;
  if (requiredItems.length >= submenus.length) {
    return loopThroughRequiredSubmenuAndInitialSubmenus(requiredItems, submenus);//eslint-disable-line
  } else if (requiredItems.length < submenus.length) {
    return loopThroughRequiredSubmenuAndInitialSubmenus(submenus, requiredItems, true);//eslint-disable-line
  }
};

const addSubmenus = (items, sub_menus) =>
  items.map(item => (item.slug === sub_menus.mealSlug ?
    ({
      ...item,
      meal: [{
        ...item.meal,
        submenus: sub_menus.submenus,
      }]
    }) : item)
  );

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
      const requireSubmenu = promptForRequiredSubmenus(action.data, state);
      if (requireSubmenu.length > 0) {
        const title = requireSubmenu[0].title;
        swal(`item in ${title} is required for this meal`);
        return {
          ...state,
          errorMessage: `item in ${title} is required for this meal`,
        };
      }
      const item = { ...action.data, meal: action.data };
      const newItems = [...state.items, item];
      return {
        ...state,
        items: addSubmenus(newItems, state.sub_menus),
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

    case 'UPDATE_SUBMENUS': {
      const { submenus, submenuId, submenuOptionId, mealSlug } = action.data;
      const subMenus = updateSubmenus(submenuId, submenus, submenuOptionId);

      return manipulateSubmenus(state, subMenus, mealSlug);
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
