import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './ModalOverlay.module.css';
import { RootState } from '../../services/reducers';

const modalRoot = document.querySelector('#modal-root');

function ModalOverlay({ children }) {
  const { isModalOverlayOpened } = useSelector((state: RootState) => state.modalOverlay);
  return ReactDOM.createPortal(
    <div
      className={`${styles.modalOverlay} ${isModalOverlayOpened && styles.modalOverlay_active}`}
    >
      {children}
    </div>,
    modalRoot,
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element,
};

export default React.memo(ModalOverlay);
