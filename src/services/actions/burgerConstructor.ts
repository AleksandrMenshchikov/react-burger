import { SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR } from '../constants/actionTypes';

export const setIngredientsToBurgerConstructor = (newData) => ({
  type: SET_INGREDIENTS_TO_BURGER_CONSTRUCTOR,
  newData,
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
    .map((item, index) => {
      if (item.type !== 'bun') {
        return { ...item, _id: item._id.slice(0, 24) + index };
      }
      return item;
    });
  dispatch(setIngredientsToBurgerConstructor(filteredData));
};

export const deleteIngredientFromBurgerConstructor = (id) => (dispatch, getState) => {
  const { data } = getState().burgerConstructor;
  const newData = data.filter((item) => item._id !== id);
  dispatch(setIngredientsToBurgerConstructor(newData));
};
