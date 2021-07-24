import * as c from '../constants';
import api from './axios';
import moment from 'moment';

export default async function getSigIndicator(year, param = 'all') {
  try {
    let path = `${c.GETINDICATOR}/sig?year=${year}&param=${param}`;

    let res = await api.get(path, {
      withCredentials: true,
      credentials: 'include',
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
