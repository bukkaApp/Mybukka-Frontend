import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  isLoaded: false,
  hasMap: false,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case 'LOAD_MAP_SCRIPT': {
      return { ...state, isLoaded: action.isLoaded, };
    }

    case 'SHOW_MAP': {
      return { ...state, hasMap: action.hasMap };
    }

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useMap = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const onLoad = isLoaded => dispatch({
    type: 'LOAD_MAP_SCRIPT',
    isLoaded,
  });

  const setMapVisibility = hasMap => dispatch({
    type: 'SHOW_MAP',
    hasMap,
  });

  const { isLoaded, hasMap } = state;

  return { isLoaded, onLoad, hasMap, setMapVisibility };
};

export const [MapProvider, useMapContext] = constate(useMap);
