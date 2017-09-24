/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import Config from '../../server/config';
import {
  getStoredAuthState, removeStoredAuthState,
} from './authUtils';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body, idToken = getStoredAuthState().idToken) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    method,
    body: JSON.stringify(body),
  })
    .then(response => {
      if (response.status === 401) {
        removeStoredAuthState();
        browserHistory.push('/');
        return Promise.reject(response);
      }
      return response.json()
      .then(json => ({
        json,
        response,
      }))
      .catch(e => {
        console.log('something went wrong -> ', e);
      });
    }
    )
    .then(({
      json,
      response,
    }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      response => response,
      error => error
    )
    .catch(err => {
      console.log('something went wrong -> ', err);
    });
}
