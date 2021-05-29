import React from "react";
import ReactDOM from "react-dom";
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

export default React.memo(ModalOverlay);
