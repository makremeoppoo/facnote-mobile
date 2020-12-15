import * as c from '../constants';
import api from './axios';

export default async function getSociety() {
    try {
      let res = await api.get(c.GETSOCIETY);
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