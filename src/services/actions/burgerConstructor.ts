import { SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR, SET_TOTALPRICE_TO_BURGER_CONSTRUCTOR } from '../constants/actionTypes';

export const setIngredientsToBurgerConstructor = (newData) => ({
  type: SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR,
  newData,
});

const setTotalPriceToBurgerConstructor = (totalPrice) => ({
  type: SET_TOTALPRICE_TO_BURGER_CONSTRUCTOR,
  totalPrice,
});

export const addIngredientToBurgerConstructor = (ingredient) => (dispatch, getState) => {
  const arrData = [ingredient, ...getState().burgerConstructor.data];
  let counterOfBuns = 0;
  const filteredData = arrData
    .filter((item) => {
      if (item.type === 'bun' && counterOfBuns === 1) {
        return false;
      }
      if (item.type === 'bun' && counterOfBuns === 0) {
        counterOfBuns += 1;
        return true;
      }
      return true;
    })
    .map((item, index) => ({ ...item, _uid: item._id + index }));
  dispatch(setIngredientsToBurgerConstructor(filteredData));
};

export const deleteIngredientFromBurgerConstructor = (uid) => (dispatch, getState) => {
  const { data } = getState().burgerConstructor;
  const newData = data.filter((item) => item._uid !== uid);
  dispatch(setIngredientsToBurgerConstructor(newData));
};

export const updateTotalPriceToBurgerConstructor = () => (dispatch, getState) => {
  const { data } = getState().burgerConstructor;
  let totalPrice;
  if (data && data.length > 0) {
    totalPrice = data.reduce((acc, currentItem) => {
      if (currentItem.type === 'bun') {
        return acc + currentItem.price * 2;
      }
      return acc + currentItem.price;
    }, 0);
  } else {
    totalPrice = 0;
  }
  dispatch(setTotalPriceToBurgerConstructor(totalPrice));
};
