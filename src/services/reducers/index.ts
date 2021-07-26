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
import { wsReducer } from './webSocket';
import { wsReducer2 } from './webSocket2';
import { ordersTapeReducer } from './ordersTape';

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
  ws: wsReducer,
  ws2: wsReducer2,
  ordersTape: ordersTapeReducer,
});

export type RootState = ReturnType<typeof rootReducer>
