import axios from 'axios';

// 'https://backendapi.mybukka.com/api/v1/'
// https://mybukka-backend.herokuapp.com/
const { NODE_ENV } = process.env;
const PORT = process.env.PORT || '1234';
const baseURL = NODE_ENV === 'production' ? 'https://mybukka-backend.herokuapp.com/api/v1/' : `http://localhost:${PORT}/api/v1/`; // eslint-disable-line

const instance = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  }
});

export default instance;
