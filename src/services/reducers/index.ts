import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalOverlayReducer } from './modalOverlay';
import { orderDetailsReducer } from './orderDetails';
import { burgerConstructorReducer } from './burgerConstructor';
import { appReducer } from './app';
import { signInReduser } from './signIn';
import { signUpReduser } from './signUp';
import { forgotPassword1Reduser } from './forgotPassword1';
import { forgotPassword2Reduser } from './forgotPassword2';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modalOverlay: modalOverlayReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  app: appReducer,
  signIn: signInReduser,
  signUp: signUpReduser,
  forgotPassword1: forgotPassword1Reduser,
  forgotPassword2: forgotPassword2Reduser,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>
