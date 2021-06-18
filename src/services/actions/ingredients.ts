import {
  GET_INGREDIENTS,
  SET_IS_ERROR_DATA,
  SET_DATA_BURGER_INGREDIENT,
  DELETE_DATA_BURGER_INGREDIENT,
} from '../constants/actionTypes';
import { api } from '../../utils/api';

export const setIngredients = (data) => ({
  type: GET_INGREDIENTS,
  data,
});

const setIsErrorData = (isErrorData) => ({
  type: SET_IS_ERROR_DATA,
  isErrorData,
});

export const setDataBurgerIngredient = (idBurgerIngredient) => ({
  type: SET_DATA_BURGER_INGREDIENT,
  idBurgerIngredient,
});

export const deleteDataBurgerIngredient = () => ({
  type: DELETE_DATA_BURGER_INGREDIENT,
});

export const getIngredients = () => (dispatch) => {
  api.getIngredients()
    .then((res) => dispatch(setIngredients(res.data)))
    .catch((err) => {
      dispatch(setIsErrorData(true));
      console.error(err);
    });
};