import axios from 'axios';

const { NODE_ENV } = process.env;
const baseURL = NODE_ENV === 'production' ? 'https://mybukka-customer-rest-service.herokuapp.com/api/v1/' : 'http://localhost:1234/api/v1/'; // eslint-disable-line

const instance = axios.create({
  baseURL,
});

export default instance;
