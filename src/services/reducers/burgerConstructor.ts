import { SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR } from '../constants/actionTypes';

const initialState = {
  data: [],
};

export const burgerConstructorReducer = (state = initialState, { type, newData }) => {
  switch (type) {
    case SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR:
      return {
        ...state,
        data: [...newData],
      };

    default:
      return state;
  }
};
