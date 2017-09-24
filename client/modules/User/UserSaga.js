/* eslint-disable no-constant-condition */
import Auth0Lock from 'auth0-lock';
import { call, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { setStoredAuthState, removeStoredAuthState } from '../../util/authUtils';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from './UserActions';

export function* loginRequestSaga() {
  console.log('proces.env => ', process.env);
  const lock = new Auth0Lock(
    'jsoPVhmild3DYcOFV7VqjBUTTJpZVEAd',
    'mraq.eu.auth0.com',
    {
      auth: { redirect: false },
      languageDictionary: { title: 'Kanban App' },
      language: 'pl',
      rememberLastLogin: false,
    },
  );
  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) {
            lock.hide();
            resolve({ profile, idToken: authResult.idToken });
          }
        });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });
      lock.show();
    });

  try {
    const { profile, idToken } = yield call(showLock);

    yield put(loginSuccess(profile, idToken));
  } catch (error) {
    yield put(loginFailure(error));
    yield call(browserHistory.push, '/');
  }
}

export function* watchLoginRequest() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield call(loginRequestSaga);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { profile, idToken } = yield take(LOGIN_SUCCESS);
    setStoredAuthState(profile, idToken);
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);

    removeStoredAuthState();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthState();
    yield call(browserHistory.push, '/');
  }
}
