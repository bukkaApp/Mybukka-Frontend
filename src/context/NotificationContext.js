import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const SET_DOWNLOAD_APP = 'SET_DOWNLOAD_APP';
const SET_DEFERRED_DOWNLOAD_APP_PROMPT = 'SET_DEFERRED_DOWNLOAD_APP_PROMPT';
const SET_APP_INSTALLED = 'SET_APP_INSTALLED';

const initialState = {
  downloadApp: false,
  deferredAppDownloadPrompt: null,
  appInstalled: false,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_DOWNLOAD_APP:
      return { ...state, downloadApp: action.payload };

    case SET_DEFERRED_DOWNLOAD_APP_PROMPT:
      return { ...state, deferredAppDownloadPrompt: action.payload };

    case SET_APP_INSTALLED:
      return { ...state, appInstalled: action.payload };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useNotification = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const setDownloadApp = (payload) => {
    dispatch({
      type: SET_DOWNLOAD_APP,
      payload,
    });
  };

  const setDeferredDownloadAppPrompt = (payload) => {
    dispatch({
      type: SET_DEFERRED_DOWNLOAD_APP_PROMPT,
      payload,
    });
  };

  const setAppInstalled = (payload) => {
    dispatch({
      type: SET_APP_INSTALLED,
      payload,
    });
  };

  const { downloadApp, deferredAppDownloadPrompt, appInstalled } = state;

  return { downloadApp, setDownloadApp, appInstalled, setAppInstalled, deferredAppDownloadPrompt, setDeferredDownloadAppPrompt };
};

export const [NotificationProvider, useNotificationContext] = constate(useNotification);
