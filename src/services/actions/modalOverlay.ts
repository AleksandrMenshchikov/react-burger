import {
  SET_IS_MODAL_OVERLAY_OPENED,
  SET_NAME_COMPONENT_ACTIVE,
} from '../constants/actionTypes';

export const setIsModalOverlayOpened = (isModalOverlayOpened) => ({
  type: SET_IS_MODAL_OVERLAY_OPENED,
  isModalOverlayOpened,
});

export const setNameComponentActive = (nameComponentActive) => ({
  type: SET_NAME_COMPONENT_ACTIVE,
  nameComponentActive,
});
