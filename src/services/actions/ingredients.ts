import {
  GET_INGREDIENTS,
  SET_IS_ERROR_DATA,
  SET_DATA_BURGER_INGREDIENT,
  DELETE_DATA_BURGER_INGREDIENT,
} from '../constants/actionTypes';
import { api } from '../../utils/api';
// import { setData, setIsErrorDataOrdersAll } from './ordersAll';

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
    .then((res) => {
      dispatch(setIngredients(res.data));

      // api.getOrdersAll()
      //   .then((response) => {
      //     const formatedData = {
      //       ...response,
      //       orders: response.orders.map((order) => {
      //         let counter = 0;
      //         return {
      //           ...order,
      //           ingredients: order.ingredients
      //             .map((ingredient) => res.data
      //               .filter((item) => {
      //                 if (item._id === ingredient) {
      //                   counter += item.price;
      //                   return true;
      //                 }
      //                 return false;
      //               })[0].image_mobile),
      //           totalPrice: counter,
      //           createdAt: new Date(order.createdAt).toLocaleString(),
      //           updatedAt: new Date(order.createdAt).toLocaleString(),
      //         };
      //       }),
      //     };
      //     dispatch(setData(formatedData));
      //   })
      //   .catch((err) => {
      //     dispatch(setIsErrorDataOrdersAll(true));
      //     console.error(err);
      //   });
    })
    .catch((err) => {
      dispatch(setIsErrorData(true));
      console.error(err);
    });
};
