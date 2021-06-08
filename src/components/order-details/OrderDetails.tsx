import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import spinWhite from '../../images/spin-white.svg';

function OrderDetails({ dataOrderDetails }) {
  return (
    <>
      {dataOrderDetails === 0
        ? (
          <div className={styles.imgContainer}>
            <img src={spinWhite} alt="Загрузка данных" />
          </div>
        )
        : dataOrderDetails === -1
          ? <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
          : <p className={`${styles.digit} text text_type_digits-large`}>{dataOrderDetails}</p>}

      <h3 className={`text text_type_main-medium mt-5 mb-0 ${dataOrderDetails === 0 && styles.text_transparent}`}>
        идентификатор заказа
      </h3>
      <div className={`${dataOrderDetails === 0 ? styles.checked_transparent : styles.checked} mt-8 mb-8`} />
      <img src="" alt="" />
      <p className={`text text_type_main-default ${dataOrderDetails === 0 && styles.text_transparent}`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive mt-2 mb-10 ${dataOrderDetails === 0 && styles.text_transparent}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  dataOrderDetails: PropTypes.number.isRequired,
};

export default React.memo(OrderDetails);
