import { SET_EMAIL_FORGOT_PASSWORD_1_VALUE, SET_IS_VALID_FORGOT_PASSWORD_1_FORM } from '../constants/actionTypes';

const initialState = {
  emailValue: '',
  isValidForm: '',
};

export const forgotPassword1Reduser = (state = initialState, { type, emailValue, isValidForm }) => {
  switch (type) {
    case SET_EMAIL_FORGOT_PASSWORD_1_VALUE:
      return {
        ...state,
        emailValue,
      };
    case SET_IS_VALID_FORGOT_PASSWORD_1_FORM:
      return {
        ...state,
        isValidForm,
      };
    default:
      return state;
  }
};
