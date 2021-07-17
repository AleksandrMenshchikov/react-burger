import { SET_EMAIL_FORGOT_PASSWORD_1_VALUE, SET_IS_VALID_FORGOT_PASSWORD_1_FORM } from '../constants/actionTypes';
import { setIsResetPasswordActive } from './app';
import { api } from '../../utils/api';

export const setEmailForgotPassword1Value = (emailValue) => ({
  type: SET_EMAIL_FORGOT_PASSWORD_1_VALUE,
  emailValue,
});

export const setIsValidForgotPassword1Form = (isValidForm) => ({
  type: SET_IS_VALID_FORGOT_PASSWORD_1_FORM,
  isValidForm,
});

export const postEmailForgotPassword1 = (email) => (dispatch) => {
  api.postForgotPassword(email).then((res) => {
    if (res.success) {
      dispatch(setIsResetPasswordActive(true));
    }
  });
};
