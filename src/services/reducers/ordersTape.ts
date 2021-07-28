import { SET_DATA_ORDERS_TAPE_DETAILS } from '../constants/actionTypes';

const initialState = {
  data: null,
};

export const ordersTapeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DATA_ORDERS_TAPE_DETAILS:
      return {
        data: payload,
      };

    default:
      return state;
  }
};
