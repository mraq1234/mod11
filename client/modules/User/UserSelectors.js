import { checkJwtTime } from '../../util/authUtils';
export const getError = state => state.user.get('error');

export const getIdToken = state => {
  if (state) {
    if (checkJwtTime(state.user.idToken)) {
      return state.user.idToken;
    }
  }
  return null;
};

export const getProfile = state => {
  return state.user.profile;
};
