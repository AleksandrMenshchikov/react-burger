import { SET_NUMBER_ORDER_DETAILS, DELETE_NUMBER_ORDER_DETAILS } from '../constants/actionTypes';

const initialState = {
  numberOrderDetails: null,
};

export const orderDetailsReducer = (state = initialState, { type, numberOrderDetails }) => {
  switch (type) {
    case SET_NUMBER_ORDER_DETAILS:
      return {
        ...state,
        numberOrderDetails,
      };
    case DELETE_NUMBER_ORDER_DETAILS:
      return {
        ...state,
        numberOrderDetails: null,
      };
    default:
      return state;
  }
};
