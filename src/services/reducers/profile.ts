import {
  SET_NAME_PROFILE_VALUE,
  SET_EMAIL_PROFILE_VALUE, SET_PASSWORD_PROFILE_VALUE, SET_IS_VALID_FORM_PROFILE,
  SET_IS_LOADING_PROFILE,
} from '../constants/actionTypes';

const initialState = {
  name: '',
  email: '',
  password: '',
  isValidForm: false,
  isLoading: false,
};

export const profileReducer = (state = initialState, {
  type, nameValue, emailValue, passwordValue, isValidForm, isLoading,
}) => {
  switch (type) {
    case SET_NAME_PROFILE_VALUE:
      return {
        ...state,
        name: nameValue,
      };
    case SET_EMAIL_PROFILE_VALUE:
      return {
        ...state,
        email: emailValue,
      };
    case SET_PASSWORD_PROFILE_VALUE:
      return {
        ...state,
        password: passwordValue,
      };
    case SET_IS_VALID_FORM_PROFILE:
      return {
        ...state,
        isValidForm,
      };
    case SET_IS_LOADING_PROFILE:
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
};
