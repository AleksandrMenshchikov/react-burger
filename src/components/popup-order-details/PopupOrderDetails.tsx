import React, { Component } from "react";
import styles from "./PopupOrderDetails.module.css";

function PopupOrderDetails(props: any) {
  return (
    <div
      className={`${styles.popup} ${
        props.isPopupOrderDetailsOpened && styles.popup_active
      }`}
      onClick={props.onHandlePopupOrderDetailsCloseClick}
    >
      <div className={`${styles.popup__inner}`}>
        <div className={styles.content}>
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.button} />
          </div>
          <p className={`${styles.digit} text text_type_digits-large`}>
            034536
          </p>
          <h3 className="text text_type_main-medium mt-5 mb-0">
            идентификатор заказа
          </h3>
          <div className={`${styles.checked} mt-8 mb-8`} />
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mt-2 mb-10">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PopupOrderDetails);
