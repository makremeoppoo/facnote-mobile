import * as c from '../constants';
import api from './axios';

export default async function saveIndemnite(data) {
  try {
    let res = await api.put(c.SAVE_INDEMNITE, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export function handler(err) {
    let error = err;
  
    if (err.response && err.response.data.hasOwnProperty('message'))
      error = err.response.data;
    else if (!err.hasOwnProperty('message')) error = err.toJSON();
  
    return new Error(error.message);
  }
  