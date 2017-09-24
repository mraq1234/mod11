import { fork } from 'redux-saga/effects';

import * as userSagas from './modules/User/UserSaga';

export default function* rootSaga() {
  yield [
    fork(userSagas.watchLoginRequest),
    fork(userSagas.watchLoginSuccess),
    fork(userSagas.watchLoginFailure),
    fork(userSagas.watchLogout),
  ];
}
