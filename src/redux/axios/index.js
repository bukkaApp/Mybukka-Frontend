import axios from 'axios';

const { NODE_ENV } = process.env;
export const backendUrl =
  NODE_ENV === 'production'
    ? `${process.env.BACKEND_PROD_URL}`
    : 'https://mybukka-backend.herokuapp.com';

export const baseURL =
  NODE_ENV === 'production'
    ? `${process.env.BACKEND_PROD_URL}/api/v1/`
    : 'https://mybukka-backend.herokuapp.com/api/v1/';

const instance = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default instance;
