import { SET_CODE_FORGOT_PASSWORD_2_VALUE, SET_IS_VALID_FORGOT_PASSWORD_2_FORM, SET_PASSWORD_FORGOT_PASSWORD_2_VALUE } from '../constants/actionTypes';

const initialState = {
  codeValue: '',
  passwordValue: '',
  isValidForm: '',
};

export const forgotPassword2Reduser = (state = initialState, {
  type, codeValue, passwordValue, isValidForm,
}) => {
  switch (type) {
    case SET_CODE_FORGOT_PASSWORD_2_VALUE:
      return {
        ...state,
        codeValue,
      };
    case SET_PASSWORD_FORGOT_PASSWORD_2_VALUE:
      return {
        ...state,
        passwordValue,
      };
    case SET_IS_VALID_FORGOT_PASSWORD_2_FORM:
      return {
        ...state,
        isValidForm,
      };
    default:
      return state;
  }
};
