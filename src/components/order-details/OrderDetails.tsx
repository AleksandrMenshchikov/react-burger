import React from 'react';
import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css';
import spinWhite from '../../images/spin-white.svg';
import { RootState } from '../../services/reducers';

function OrderDetails() {
  const { numberOrderDetails } = useSelector((state: RootState) => state.orderDetails);
  return (
    <>
      <div className={styles.titleContainer}>
        <h3 className="text text_type_main-large">
          {' '}
        </h3>
        <button type="button" className={styles.button} aria-label="Закрыть" />
      </div>
      {numberOrderDetails === 'emptyOrder'
        ? <h1 className="text text_type_main-large">Ваш заказ пустой</h1>
        : numberOrderDetails === null
          ? (
            <div className={styles.imgContainer}>
              <img src={spinWhite} alt="Загрузка данных" />
            </div>
          )
          : numberOrderDetails === 'error'
            ? <h1 className="text text_type_main-large">Ошибка загрузки данных</h1>
            : <p className={`${styles.digit} text text_type_digits-large`}>{numberOrderDetails}</p>}

      <h3 className={`text text_type_main-medium mt-5 mb-0 ${(numberOrderDetails === null || numberOrderDetails === 'error' || numberOrderDetails === 'emptyOrder') && styles.text_transparent}`}>
        идентификатор заказа
      </h3>
      <div className={`${(numberOrderDetails === null || numberOrderDetails === 'error' || numberOrderDetails === 'emptyOrder') ? styles.checked_transparent : styles.checked} mt-8 mb-8`} />
      <img src="" alt="" />
      <p className={`text text_type_main-default ${(numberOrderDetails === null || numberOrderDetails === 'error' || numberOrderDetails === 'emptyOrder') && styles.text_transparent}`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive mt-2 mb-10 ${(numberOrderDetails === null || numberOrderDetails === 'error' || numberOrderDetails === 'emptyOrder') && styles.text_transparent}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default React.memo(OrderDetails);
