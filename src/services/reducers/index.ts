import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalOverlayReducer } from './modalOverlay';
import { orderDetailsReducer } from './orderDetails';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modalOverlay: modalOverlayReducer,
  orderDetails: orderDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
