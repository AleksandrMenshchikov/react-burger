import {
  SET_NAME_PROFILE_VALUE,
  SET_EMAIL_PROFILE_VALUE, SET_PASSWORD_PROFILE_VALUE, SET_IS_VALID_FORM_PROFILE,
  SET_IS_LOADING_PROFILE,
} from '../constants/actionTypes';

export const setNameProfileValue = (nameValue) => ({
  type: SET_NAME_PROFILE_VALUE,
  nameValue,
});

export const setEmailProfileValue = (emailValue) => ({
  type: SET_EMAIL_PROFILE_VALUE,
  emailValue,
});

export const setPasswordProfileValue = (passwordValue) => ({
  type: SET_PASSWORD_PROFILE_VALUE,
  passwordValue,
});

export const setIsValidFormProfile = (isValidForm) => ({
  type: SET_IS_VALID_FORM_PROFILE,
  isValidForm,
});

export const setIsLoadingProfile = (isLoading) => ({
  type: SET_IS_LOADING_PROFILE,
  isLoading,
});
