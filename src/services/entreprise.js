import * as c from '../constants';
import api from './axios';
import AsyncStorage from '@react-native-community/async-storage';

export default async function getEnterprise(limit,page) {
  try {
    console.log(`${c.GETENTERPRISE}?limit=${limit}&page=${page}`)
    let res = await api.get( `${c.GETENTERPRISE}?limit=${limit}&page=${page}&date_debut=01/01/2020&date_fin=31/12/2021`, {
      withCredentials: true,
      credentials: 'include'
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
