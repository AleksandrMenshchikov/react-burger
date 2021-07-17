import {
  SET_EMAIL_REGISTER_VALUE, SET_PASSWORD_REGISTER_VALUE, SET_NAME_VALUE, SET_IS_VALID_REGISTER_FORM,
} from '../constants/actionTypes';

export const setEmailRegisterValue = (emailValue) => ({
  type: SET_EMAIL_REGISTER_VALUE,
  emailValue,
});

export const setPasswordRegisterValue = (passwordValue) => ({
  type: SET_PASSWORD_REGISTER_VALUE,
  passwordValue,
});

export const setNameRegisterValue = (nameValue) => ({
  type: SET_NAME_VALUE,
  nameValue,
});

export const setIsValidRegisterForm = (isValidForm) => ({
  type: SET_IS_VALID_REGISTER_FORM,
  isValidForm,
});
