import * as c from '../constants';
import api from './axios';

export default async function replyComment(comment, bankId, billType) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  const form_data = new FormData();
  form_data.append('comment', comment);
  try {
    let res = await api.post(`${c.REPLYCOMMENT}/${billType}/${bankId}`,form_data, options);
   console.log(res.data)
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
