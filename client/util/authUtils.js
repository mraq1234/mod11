import jwt_decode from 'jwt-decode'; // eslint-disable-line

export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';


export const setStoredAuthState = (profile, idToken) => {
  (typeof localStorage === 'undefined') ? null : localStorage.setItem(ID_TOKEN, idToken); // eslint-disable-line
  (typeof localStorage === 'undefined') ? null : localStorage.setItem(PROFILE, JSON.stringify(profile)); // eslint-disable-line
};

export const removeStoredAuthState = () => {
  (typeof localStorage === 'undefined') ? null : localStorage.removeItem(ID_TOKEN); // eslint-disable-line
  (typeof localStorage === 'undefined') ? null : localStorage.removeItem(PROFILE); // eslint-disable-line
};

export const checkJwtTime = (idToken) => {
  if (!idToken) return false;
  try {
    const decodedToken = jwt_decode(idToken);
    const currentTime = new Date().getTime() / 1000;
    if (decodedToken.exp <= currentTime) {
      console.error('Token expired!'); // eslint-disable-line
      removeStoredAuthState();
      return false;
    }
    return true;
  } catch (err) {
    removeStoredAuthState();
    return false;
  }
};

export const getStoredAuthState = () => {
  try {
    const idToken = window.localStorage.getItem(ID_TOKEN);
    const profile = JSON.parse(window.localStorage.getItem(PROFILE));
    return checkJwtTime(idToken) ? { idToken, profile } : {};
  } catch (err) {
    removeStoredAuthState();
    return {};
  }
};
