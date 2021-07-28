import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Preload.module.css';
import spinWhite from '../../images/spin-white.svg';
import { RootState } from '../../services/reducers';

function Preload(): JSX.Element {
  const { isErrorData } = useSelector((state: RootState) => state.ingredients);

  return (
    <div
      className={styles.container}
    >
      {isErrorData ? (
        <h1 className="text text_type_main-large">
          Ошибка на сервере. Попробуйте зайти на сайт чуть позже.
        </h1>
      ) : (
        <img src={spinWhite} alt="Загрузка данных" />
      )}
    </div>
  );
}

export default React.memo(Preload);
