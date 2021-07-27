import { SET_NUMBER_ORDER_DETAILS, DELETE_NUMBER_ORDER_DETAILS } from '../constants/actionTypes';
import { setIsModalOverlayOpened, setNameComponentActive } from './modalOverlay';
import { setIngredientsToBurgerConstructor } from './burgerConstructor';
import { api } from '../../utils/api';
import { getCookie } from '../../utils/cookies';

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
  if (getState().burgerConstructor.data.length > 0
  && (arrayOfId.includes('60d3b41abdacab0026a733c6') || arrayOfId.includes('60d3b41abdacab0026a733c7'))) {
    const accessToken = getCookie('accessToken');
    api.postOrders(arrayOfId, accessToken)
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
