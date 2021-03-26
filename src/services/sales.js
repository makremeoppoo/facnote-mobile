import moment from 'moment';

import * as c from '../constants';
import api from './axios';

export default async function getSales(limit, page, startDate, endDate) {
  try {
    let path = `${c.GETSALES}?limit=${limit}&page=${page}`;
    if (startDate != null) {
      path = `${path}&start_date=${moment(startDate).format('DD/MM/YYYY')}`;
    }

    if (endDate != null) {
      path = `${path}&end_date=${moment(endDate).format('DD/MM/YYYY')}`;
    }

    console.log('path===========', path);
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
