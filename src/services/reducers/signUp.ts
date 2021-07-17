import {
  SET_EMAIL_REGISTER_VALUE, SET_PASSWORD_REGISTER_VALUE,
  SET_NAME_VALUE, SET_IS_VALID_REGISTER_FORM,
} from '../constants/actionTypes';

const initialState = {
  nameValue: '',
  emailValue: '',
  passwordValue: '',
  isValidForm: '',
};

export const signUpReduser = (state = initialState, {
  type, nameValue, emailValue, passwordValue, isValidForm,
}) => {
  switch (type) {
    case SET_NAME_VALUE:
      return {
        ...state,
        nameValue,
      };
    case SET_EMAIL_REGISTER_VALUE:
      return {
        ...state,
        emailValue,
      };
    case SET_PASSWORD_REGISTER_VALUE:
      return {
        ...state,
        passwordValue,
      };
    case SET_IS_VALID_REGISTER_FORM:
      return {
        ...state,
        isValidForm,
      };
    default:
      return state;
  }
};
