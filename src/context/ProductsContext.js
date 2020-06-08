import { useEffect, useReducer } from 'react';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
  products: null,
  mealToDisplay: {},
  message: '',
  currentPage: 1,
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_PRODUCTS}_SUCCESS`: {
      return {
        ...state,
        message: action.payload.message,
        products: action.payload.nearByBukkas,
        currentPage: action.payload.currentPage || 1,
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };
    }

    case `${SET_PRODUCTS}_ERROR`:
      return {
        ...state,
        message: '',
        businesses: [],
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.payload.message,
      };

    case `${SET_PRODUCTS}_MANIPULATE_MEAL`: {
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

const loggerReducer = logger(reducer);

const useProducts = () => {
  const [data, setData] = useLocalStorage('businesses', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setProducts = (payload, error) => {
    dispatch({
      type: `${SET_PRODUCTS}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const setMealToDisplay = () => {
    
  }
  const { products, message, currentPage, errorMessage, status } = state;

  return { products, message, currentPage, errorMessage, status, setProducts };
};

export const [ProductProvider, useProductsContext] = constate(useProducts);
