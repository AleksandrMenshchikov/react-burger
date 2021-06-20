import {
  GET_INGREDIENTS,
  SET_IS_ERROR_DATA,
  SET_DATA_BURGER_INGREDIENT,
  DELETE_DATA_BURGER_INGREDIENT,
} from '../constants/actionTypes';

const initialState = {
  data: [],
  isErrorData: false,
  dataBurgerIngredient: null,
};

export const ingredientsReducer = (state = initialState, {
  type,
  data,
  isErrorData,
  idBurgerIngredient,
}) => {
  switch (type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        data: [...data],
      };
    case SET_IS_ERROR_DATA:
      return {
        ...state,
        isErrorData,
      };
    case SET_DATA_BURGER_INGREDIENT:
      return {
        ...state,
        dataBurgerIngredient: state.data.find((item) => item._id === idBurgerIngredient),
      };
    case DELETE_DATA_BURGER_INGREDIENT:
      return {
        ...state,
        dataBurgerIngredient: null,
      };
    default:
      return state;
  }
};
