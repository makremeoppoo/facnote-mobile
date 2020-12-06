import axios from 'axios';
import * as c from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: c.API_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    } else {
      config.headers.authorization = 'Basic';
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (err) => {
    console.log(err);
  },
);

export default api;
