import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const modalRoot = document.querySelector('#modal-root');

function ModalOverlay({ isModalOverlayOpened, children }) {
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
  isModalOverlayOpened: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default React.memo(ModalOverlay);
