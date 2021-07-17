import { SET_CODE_FORGOT_PASSWORD_2_VALUE, SET_IS_VALID_FORGOT_PASSWORD_2_FORM, SET_PASSWORD_FORGOT_PASSWORD_2_VALUE } from '../constants/actionTypes';

export const setCodeForgotPassword2Value = (codeValue) => ({
  type: SET_CODE_FORGOT_PASSWORD_2_VALUE,
  codeValue,
});

export const setPasswordForgotPassword2Value = (passwordValue) => ({
  type: SET_PASSWORD_FORGOT_PASSWORD_2_VALUE,
  passwordValue,
});

export const setIsValidForgotPassword2Form = (isValidForm) => ({
  type: SET_IS_VALID_FORGOT_PASSWORD_2_FORM,
  isValidForm,
});
