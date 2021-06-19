import { SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR, SET_TOTALPRICE_TO_BURGER_CONSTRUCTOR } from '../constants/actionTypes';

const initialState = {
  data: [],
  totalPrice: 0,
};

export const burgerConstructorReducer = (state = initialState, { type, newData, totalPrice }) => {
  switch (type) {
    case SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR:
      return {
        ...state,
        data: [...newData],
      };
    case SET_TOTALPRICE_TO_BURGER_CONSTRUCTOR:
      return {
        ...state,
        totalPrice,
      };
    default:
      return state;
  }
};
