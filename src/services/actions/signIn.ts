import { SET_EMAIL_VALUE, SET_PASSWORD_VALUE, SET_IS_VALID_FORM } from '../constants/actionTypes';

export const setEmailValue = (emailValue) => ({
  type: SET_EMAIL_VALUE,
  emailValue,
});

export const setPasswordValue = (passwordValue) => ({
  type: SET_PASSWORD_VALUE,
  passwordValue,
});

export const setIsValidForm = (isValidForm) => ({
  type: SET_IS_VALID_FORM,
  isValidForm,
});
