import { SET_NUMBER_ORDER_DETAILS, DELETE_NUMBER_ORDER_DETAILS } from '../constants/actionTypes';
import { setIsModalOverlayOpened, setNameComponentActive } from './modalOverlay';
import { api } from '../../utils/api';

const setNumberOrderDetails = (numberOrderDetails) => ({
  type: SET_NUMBER_ORDER_DETAILS,
  numberOrderDetails,
});

export const deleteNumberOrderDetails = () => ({
  type: DELETE_NUMBER_ORDER_DETAILS,
});

export const AsyncGetNumberOrderDetails = (arrayOfId) => (dispatch, getState) => {
  dispatch(setIsModalOverlayOpened(true));
  dispatch(setNameComponentActive('BurgerConstructor'));
  api.postOrders(arrayOfId)
    .then((res) => {
      if (getState().modalOverlay.isModalOverlayOpened) {
        dispatch(setNumberOrderDetails(res.order.number));
      }
    })
    .catch((err) => {
      dispatch(setNumberOrderDetails('error'));
      console.error(err);
    });
};
