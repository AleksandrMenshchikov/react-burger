import { SET_IS_LOGGED_IN, SET_IS_RESET_PASSWORD_ACTIVE } from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  isResetPasswordActive: false,
};

export const appReducer = (state = initialState, { type, isLoggedIn, isResetPasswordActive }) => {
  switch (type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn,
      };
    case SET_IS_RESET_PASSWORD_ACTIVE:
      return {
        ...state,
        isResetPasswordActive,
      };
    default:
      return state;
  }
};
