import axios from 'axios';
import { TrackJS } from 'trackjs';
import React, { useEffect } from 'react';
import { useToastContext } from '../context/ToastContext';
import { useUserContext } from '../context/UserContext';
import { useLocationContext } from '../context/LocationContext';

const { NODE_ENV } = process.env;
const PORT = process.env.PORT || '1234';
const baseURL =
  NODE_ENV === 'production'
    ? process.env.BACKEND_PROD_URL
    : `https://mybukka-backend.herokuapp.com/api/v1`; // eslint-disable-line
// : `http://localhost:${PORT}/api/v1/`; // eslint-disable-line

class Axios {
  init = () => {
    const token = localStorage.getItem('x-access-token');
    const axiosConnect = axios.create({
      baseURL,
      responseType: 'json',
      headers: { Authorization: token },
    });

    return axiosConnect;
  };
}

// export default new Axios();

const axiosInstance = new Axios();
// const axiosInstance.init() = axios.create({
//   baseURL,
//   responseType: 'json',
//   headers: { accept: 'application/json' },
// });

const endpointTransform = (endpoint, id) => {
  let needle = '$id';
  if (!id) {
    needle = '$id/';
  }
  return endpoint.replace(needle, id || '');
};

const createEndpoint = (endpoint) => ({
  get: (id) => axiosInstance.init().get(endpointTransform(endpoint, id)),
  delete: (id) => axiosInstance.init().delete(endpointTransform(endpoint, id)),
  put: (id, data, config) =>
    axiosInstance.init().put(endpointTransform(endpoint, id), data, config),
  patch: (id, data, config) =>
    axiosInstance.init().patch(endpointTransform(endpoint, id), data, config),
  post: (data, id) =>
    axiosInstance.init().post(endpointTransform(endpoint, id), data),
});

const createHyperlinkedEndpoint = (endpoint) => ({
  get: ({ id, url }) =>
    axiosInstance.init().get(url || endpointTransform(endpoint, id)),
  patch: ({ id, url, data, config }) =>
    axiosInstance
      .init()
      .patch(url || endpointTransform(endpoint, id), data, config),
  post: ({ data, id }) =>
    axiosInstance.init().post(endpointTransform(endpoint, id), data),
  put: ({ data, id }) =>
    axiosInstance.init().put(endpointTransform(endpoint, id), data),
});

const useApi = () => {
  const { setToast } = useToastContext();
  const { token, paymentException } = useUserContext();
  const { coordinates } = useLocationContext();
  const byLocaton = `longitude=${coordinates[0]}&lattitude=${coordinates[1]}`;

  useEffect(() => {
    let interceptor;
    // if (token) {
    interceptor = axiosInstance.init().interceptors.request.use((config) => ({
      ...config,
      headers: { Authorization: token, ...config.headers },
    }));
    // }
    return () => {
      if (interceptor) {
        axiosInstance.init().interceptors.request.eject(interceptor);
      }
    };
  }, []);

  useEffect(() => {
    const interceptor = axiosInstance.init().interceptors.response.use(
      (res) => {
        setToast({ message: null });
        return res;
      },
      (err) => {
        if (process.env.NODE_ENV === 'production') {
          TrackJS.console.log({
            url: err.response.url,
            status: err.response.status,
            statusText: err.response.statusText,
            request: err.response.data,
          });

          TrackJS.track(
            `${err.response.status} ${err.response.statusText}: ${err.response.url}`
          );
        }

        if (err.config.method === 'get') return;

        switch (err.response.status) {
          case 404:
            setToast({
              message:
                'Unfortunately, the data you are looking for is unavailable',
              type: 'error',
            });
            break;

          case 401:
            setToast({
              message:
                'Access denied. Try logging in or verifying your account.',
              type: 'error',
            });
            break;

          default:
          case 500:
            setToast({ message: 'Oops. Something went wrong.', type: 'error' });
            break;
        }
        throw err;
      }
    );

    return () => {
      if (interceptor) {
        axiosInstance.init().interceptors.response.eject(interceptor);
      }
    };
  }, [setToast]);

  /**
   * @example
   * // verify
   *  type => verify-phone / send-code
   */
  const API = React.useMemo(
    () => ({
      address: createEndpoint('address/$id/'),
      authToken: {
        post: (data) => axiosInstance.init().post('user/signin', data),
      },
      passwordReset: createHyperlinkedEndpoint('/user/reset/$id/'),
      validateToken: createEndpoint('/user/token/validate'),
      card: createEndpoint(
        `card/$id/${(paymentException && '?exception=true') || ''}`
      ),
      url: createEndpoint(`card/url`),
      payment: createEndpoint('pay/$id/'),
      reportIssue: createEndpoint('/user/comment'),
      history: '/order?role=customer',
      order: createEndpoint('/order'),
      catelogs: createEndpoint('menu/$id'), // $id => /menu/bukkaId?type=${type}
      business: createEndpoint('bukka/index/$id/'),
      categories: createHyperlinkedEndpoint('categories/'),
      businesses: createEndpoint(`bukka/nearby?$id&${byLocaton}`),
      businessGroup: createEndpoint(`place-group/items?${byLocaton}`),
      businessCategories: createEndpoint(`cuisine/items?${byLocaton}`),
      profile: createEndpoint('user/profile/$id/'),
      register: {
        post: (data) => axiosInstance.init().post('user/signup', data),
      },
      verify: {
        post: (data, type) => axiosInstance.init().post(`user/${type}/`, data),
      },
      socialAuth: {
        post: (data) => axiosInstance.init().post('user/social/auth', data),
      },
    }),
    [coordinates, paymentException]
  );

  return { API, axiosInstance };
};

export default useApi;
