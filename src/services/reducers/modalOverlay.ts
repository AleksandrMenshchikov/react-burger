import {
  SET_IS_MODAL_OVERLAY_OPENED,
  SET_NAME_COMPONENT_ACTIVE,
} from '../constants/actionTypes';

const initialState = {
  isModalOverlayOpened: false,
  nameComponentActive: '',
};

export const modalOverlayReducer = (state = initialState, {
  type,
  isModalOverlayOpened,
  nameComponentActive,
}) => {
  switch (type) {
    case SET_IS_MODAL_OVERLAY_OPENED:
      return {
        ...state,
        isModalOverlayOpened,
      };
    case SET_NAME_COMPONENT_ACTIVE:
      return {
        ...state,
        nameComponentActive,
      };
    default:
      return state;
  }
};
