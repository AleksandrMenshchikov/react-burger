import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalOverlayReducer } from './modalOverlay';
import { orderDetailsReducer } from './orderDetails';
import { burgerConstructorReducer } from './burgerConstructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modalOverlay: modalOverlayReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
});

export type RootState = ReturnType<typeof rootReducer>
