export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => (
  {
    type: LOGIN_REQUEST,
  }
);

export const loginSuccess = (profile, idToken) => (
  {
    type: LOGIN_SUCCESS,
    profile,
    idToken,
  }
);

export const loginFailure = error => (
  {
    type: LOGIN_FAILURE,
    error,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);
