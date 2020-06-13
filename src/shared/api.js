import axios from 'axios';
import { TrackJS } from 'trackjs';
import React, { useEffect } from 'react';
import { useToastContext } from '../context/ToastContext';
import { useUserContext } from '../context/UserContext';
import { useLocationContext } from '../context/LocationContext';

const { NODE_ENV } = process.env;
const PORT = process.env.PORT || '1234';
const baseURL = NODE_ENV === 'production' ? process.env.BACKEND_PROD_URL : `http://localhost:${PORT}/api/v1/`; // eslint-disable-line

const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers: { accept: 'application/json' }
});

const endpointTransform = (endpoint, id) => {
  let needle = '$id';
  if (!id) { needle = '$id/'; }
  return endpoint.replace(needle, id || '');
};

const createEndpoint = endpoint => ({
  get: id => axiosInstance.get(endpointTransform(endpoint, id)),
  delete: id => axiosInstance.delete(endpointTransform(endpoint, id)),
  put: (id, data, config) => axiosInstance.put(endpointTransform(endpoint, id), data, config),
  patch: (id, data, config) => axiosInstance.patch(endpointTransform(endpoint, id), data, config),
  post: (data, id) => axiosInstance.post(endpointTransform(endpoint, id), data),
});

const createHyperlinkedEndpoint = endpoint => ({
  get: ({ id, url }) => axiosInstance.get(url || endpointTransform(endpoint, id)),
  patch: ({ id, url, data, config }) => axiosInstance.patch(url || endpointTransform(endpoint, id), data, config),
  post: ({ data, id }) => axiosInstance.post(endpointTransform(endpoint, id), data),
});

const useApi = () => {
  const { setToast } = useToastContext();
  const { token } = useUserContext();
  const { coordinates } = useLocationContext();
  const byLocaton = `longitude=${coordinates[0]}&lattitude=${coordinates[1]}`;

  useEffect(() => {
    let interceptor;
    if (token) {
      interceptor = axiosInstance.interceptors.request.use(config => ({ ...config, headers: { Authorization: token, ...config.headers } }));
    }
    return () => {
      if (interceptor) {
        axiosInstance.interceptors.request.eject(interceptor);
      }
    };
  }, [token]);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use((res) => {
      setToast({ message: null });
      return res;
    }, (err) => {
      if (process.env.NODE_ENV === 'production') {
        TrackJS.console.log({
          url: err.response.url,
          status: err.response.status,
          statusText: err.response.statusText,
          request: err.response.data,
        });

        TrackJS.track(`${err.response.status} ${err.response.statusText}: ${err.response.url}`);
      }

      switch (err.response.status) {
        case 404:
          setToast({ message: 'Unfortunately, the data you are looking for is unavailable', type: 'error' });
          break;

        case 401:
          setToast({ message: 'Access denied. Try logging in or verifying your account.', type: 'error' });
          break;

        default:
        case 500:
          setToast({ message: 'Oops. Something went wrong.', type: 'error' });
          break;
      }
      throw err;
    });

    return () => {
      if (interceptor) {
        axiosInstance.interceptors.response.eject(interceptor);
      }
    };
  }, [setToast]);

  /**
   * @example
   * // verify
   *  type => verify-phone / send-code
   */
  const API = React.useMemo(() => ({
    address: createEndpoint('address/$id/'),
    authToken: { post: data => axiosInstance.post('user/signin', data) },
    card: createEndpoint('card/$id/'),
    payment: createEndpoint('pay/$id/'),
    catelogs: createEndpoint('menu/$id'), // $id => /menu/bukkaId?type=${type}
    business: createEndpoint('bukka/$id/'),
    categories: createHyperlinkedEndpoint('categories/'),
    businesses: createEndpoint(`bukka/nearby?$id&${byLocaton}`),
    businessGroup: createEndpoint(`place-group/items?${byLocaton}`),
    businessCategories: createEndpoint(`cuisine/items?${byLocaton}`),
    profile: createEndpoint('user/profile/$id/'),
    register: { post: data => axiosInstance.post('user/signup', data) },
    verify: { post: (data, type) => axiosInstance.post(`user/${type}/`, data) },
    socialAuth: { post: data => axiosInstance.post('user/social/auth', data) },
  }), [coordinates]);

  return { API, axiosInstance };
};


export default useApi;
