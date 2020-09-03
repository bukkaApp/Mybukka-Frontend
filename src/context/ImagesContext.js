import { useEffect, useReducer } from 'react';
import constate from 'constate';
import { useLocalStorage } from '../shared/useLocalStorage';
import logger from './Logger';

const SET_ACTIVE_IMAGES = 'SET_ACTIVE_IMAGES';

const initialState = {};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_ACTIVE_IMAGES:
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useImages = () => {
  const [data, setData] = useLocalStorage('images', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setImages = (imgName) => {
    const payload = { [imgName]: true };
    dispatch({
      type: SET_ACTIVE_IMAGES,
      payload
    });
  };

  return [state, setImages];
};

export const [ImagesProvider, useImagesContext] = constate(useImages);
