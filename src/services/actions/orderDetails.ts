import { SET_NUMBER_ORDER_DETAILS, DELETE_NUMBER_ORDER_DETAILS } from '../constants/actionTypes';
import { setIsModalOverlayOpened, setNameComponentActive } from './modalOverlay';
import { setIngredientsToBurgerConstructor } from './burgerConstructor';
import { api } from '../../utils/api';

const setNumberOrderDetails = (numberOrderDetails) => ({
  type: SET_NUMBER_ORDER_DETAILS,
  numberOrderDetails,
});

export const deleteNumberOrderDetails = () => ({
  type: DELETE_NUMBER_ORDER_DETAILS,
});

export const getNumberOrderDetails = (arrayOfId) => (dispatch, getState) => {
  dispatch(setIsModalOverlayOpened(true));
  dispatch(setNameComponentActive('BurgerConstructor'));
  if (getState().burgerConstructor.data.length > 0) {
    api.postOrders(arrayOfId)
      .then((res) => {
        if (getState().modalOverlay.isModalOverlayOpened) {
          dispatch(setNumberOrderDetails(res.order.number));
          dispatch(setIngredientsToBurgerConstructor([]));
        }
      })
      .catch((err) => {
        dispatch(setNumberOrderDetails('error'));
        console.error(err);
      });
  } else {
    dispatch(setNumberOrderDetails('emptyOrder'));
  }
};
