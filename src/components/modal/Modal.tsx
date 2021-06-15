import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Modal.module.css';
import { RootState } from '../../services/reducers';

function Modal({ children }: any) {
  const { nameComponentActive } = useSelector((state:RootState) => state.modalOverlay);
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
  children: PropTypes.element,
};

Modal.defaultProps = {
  children: null,
};

export default React.memo(Modal);
