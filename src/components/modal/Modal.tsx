import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

function Modal({ nameComponentActive, children }: any) {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h3 className="text text_type_main-large">
            {nameComponentActive === 'BurgerIngredients'
              && 'Детали ингредиента'}
          </h3>
          <button type="button" className={styles.button} aria-label="Закрыть" />
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  nameComponentActive: PropTypes.string.isRequired,
  children: PropTypes.element,
};

Modal.defaultProps = {
  children: null,
};

export default React.memo(Modal);
