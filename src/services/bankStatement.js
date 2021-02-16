import * as c from '../constants';
import api from './axios';
import moment from 'moment';

export default async function getEnterprise(
  limit = 10,
  page = 1,
  startDate,
  endDate,
  min,
  max,
  multipleSearch,
  debitSearch,
  accountNumberSearch,
) {
  try {
    
    
    let path = `${c.GETENTERPRISE}?limit=${limit}&page=${page}`;
    if (startDate != null)
      path = `${path}&start_date=${moment(startDate).format('DD/MM/YYYY')}`;


    if (endDate != null)
      path = `${path}&end_date=${moment(endDate).format('DD/MM/YYYY')}`;


    if (min != '') path = `${path}&min=${min}`;
    if (max != '') path = `${path}&max=${max}`;

    if (multipleSearch != '') path = `${path}&search =${multipleSearch}`;

    if (debitSearch != '') path = `${path}&debit=${debitSearch}`;

    if (accountNumberSearch != '')
      path = `${path}&account_number=${accountNumberSearch}`;


    console.log("path",path);
    let res = await api.get(path, {
      withCredentials: true,
      credentials: 'include',
    });
    console.log('vvv', res);

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
