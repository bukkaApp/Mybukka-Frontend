import { useEffect, useState, useReducer } from 'react';
import { SET_MODAL } from 'Redux/actionTypes';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  show: false
};


const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_MODAL:
      return { ...state, show: action.payload || !state.show };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useModal = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setModal = (payload) => {
    dispatch({
      type: SET_MODAL,
      payload,
    });
  };

  const { show } = state;

  return { show, setModal };
};

export const [ModalProvider, useModalContext] = constate(useModal);
