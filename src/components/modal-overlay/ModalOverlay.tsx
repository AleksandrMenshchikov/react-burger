import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

const modalRoot = document.querySelector("#modal-root");

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div
      className={`${styles.modalOverlay} ${props.isModalOverlayOpened && styles.modalOverlay_active}`}
    >
      {props.children}
    </div>,
    modalRoot
  );
}

ModalOverlay.propTypes = {
  isModalOverlayOpened: PropTypes.bool,
  children: PropTypes.element,
};

export default React.memo(ModalOverlay);
