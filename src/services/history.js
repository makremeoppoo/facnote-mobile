import * as c from '../constants';
import api from './axios';
import AsyncStorage from '@react-native-community/async-storage';

export default async function getHistory() {
  try {
    const data = await AsyncStorage.getItem('coockie');
    console.log(JSON.parse(data).headers)
    let res = await api.get(c.GETHISTORY, {
      withCredentials: true,
      headers: {
        Cookie: JSON.parse(data).headers['set-cookie'],
      },
    });
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

function handler(err) {
  let error = err;

  if (err.response && err.response.data.hasOwnProperty('message'))
    error = err.response.data;
  else if (!err.hasOwnProperty('message')) error = err.toJSON();

  return new Error(error.message);
}
