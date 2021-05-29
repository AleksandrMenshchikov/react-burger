import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

function Modal(props: any) {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h3 className="text text_type_main-large">
            {props.nameComponentActive === "BurgerIngredients" &&
              "Детали ингредиента"}
          </h3>
          <button type="button" className={styles.button} />
        </div>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  nameComponentActive: PropTypes.string,
  children: PropTypes.element,
};

export default React.memo(Modal);
