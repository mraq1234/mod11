import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './UserActions';
import { getStoredAuthState } from '../../util/authUtils';

export const initialState = {
  isLoggingIn: false,
  idToken: null,
  profile: null,
  error: null,
};
const { idToken, profile } = getStoredAuthState();

export default function reducer(state = { ...initialState, idToken, profile }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoggingIn: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoggingIn: false, idToken: action.idToken, profile: action.profile };
    case LOGIN_FAILURE:
      return { ...state, isLoggingIn: false, idToken: null, profile: null, error: action.error };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
