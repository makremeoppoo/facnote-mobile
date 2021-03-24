import * as c from '../constants';
import api from './axios';
import moment from 'moment';

export default async function getComments(
  limit = 10,
  page = 1,
  bankId
  
) {
  try {
    
    
    let path = `${c.GETCOMMENTS}/entreprise/${bankId}?limit=${limit}&page=${page}`;
    
    
    console.log("path",path);
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
