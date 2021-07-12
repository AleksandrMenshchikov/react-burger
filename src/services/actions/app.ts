import { SET_IS_LOGGED_IN, SET_IS_RESET_PASSWORD_ACTIVE } from '../constants/actionTypes';

export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn,
});

export const setIsResetPasswordActive = (isResetPasswordActive) => ({
  type: SET_IS_RESET_PASSWORD_ACTIVE,
  isResetPasswordActive,
});
