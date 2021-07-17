import { SET_EMAIL_VALUE, SET_PASSWORD_VALUE, SET_IS_VALID_FORM } from '../constants/actionTypes';

const initialState = {
  emailValue: '',
  passwordValue: '',
  isValidForm: '',
};

export const signInReduser = (state = initialState, {
  type, emailValue, passwordValue, isValidForm,
}) => {
  switch (type) {
    case SET_EMAIL_VALUE:
      return {
        ...state,
        emailValue,
      };
    case SET_PASSWORD_VALUE:
      return {
        ...state,
        passwordValue,
      };
    case SET_IS_VALID_FORM:
      return {
        ...state,
        isValidForm,
      };
    default:
      return state;
  }
};
