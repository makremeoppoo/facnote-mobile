import * as c from '../constants';
import api from './axios';

export async function register(data) {
  try {
    let res = await api.post(c.REGISTER, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function login(data) {

  try {
    let res = await api.post(c.LOGIN, data);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function getCabinet() {
  try {
    let res = await api.get(c.GETCABINET);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    const form_data = new FormData();
    for (let key in data) form_data.append(key, data[key]);

    let res = await api.put(
      `${c.UPDATE_PROFILE}/${userId}`,
      form_data,
      options,
    );
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
