import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreloadModal.module.css';
import spinWhite from '../../images/spin-white.svg';

function PreloadModal({ isError }): JSX.Element {
  return (
    <div
      className={styles.container}
    >
      {isError ? (
        <h1 className="text text_type_main-large">
          Ошибка на сервере. Попробуйте зайти на сайт чуть позже.
        </h1>
      ) : (
        <img src={spinWhite} alt="Загрузка данных" />
      )}
    </div>
  );
}

PreloadModal.propTypes = {
  isError: PropTypes.bool.isRequired,
};

export default React.memo(PreloadModal);
