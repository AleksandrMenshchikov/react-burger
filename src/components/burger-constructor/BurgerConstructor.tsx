import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataContext } from '../../utils/appContext';
import styles from './BurgerConstructor.module.css';

const initialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'reduce':
      return { totalPrice: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor({ onHandleButtonOrderClick } : any) {
  const [totalPrice, dispatch] = React.useReducer(reducer, initialState, undefined);

  let data = React.useContext(dataContext);
  let counterOfBuns = 0;
  const filteredData = data.filter((item) => {
    if (item.type === 'bun' && counterOfBuns === 1) {
      return false;
    }
    if (item.type === 'bun' && counterOfBuns === 0) {
      counterOfBuns += 1;
      return true;
    }
    return true;
  });

  data = filteredData;

  React.useEffect(() => {
    if (data && data.length > 0) {
      dispatch({
        type: 'reduce',
        payload: data.reduce((acc, currentItem) => {
          if (currentItem.type === 'bun') {
            return acc + currentItem.price * 2;
          }
          return acc + currentItem.price;
        }, 0),
      });
    }
  }, []);

  function handleButtonOrderClick() {
    const arrayOfId = data.reduce((acc, currentItem) => {
      acc.push(currentItem._id);
      return acc;
    }, []);
    onHandleButtonOrderClick(arrayOfId);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.length > 0 && data.map((item) => {
          if (item.type === 'bun') {
            return (
              <li className={styles.listItemTop} key={item._id}>
                <img
                  src={item.image_mobile}
                  alt="Фото ингредиента"
                  className={styles.img}
                />
                <p className="text text_type_main-default">
                  {item.name}
                  {' '}
                  (верх)
                </p>
                <div className={styles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {new Intl.NumberFormat('ru').format(item.price)}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <LockIcon type="secondary" />
              </li>
            );
          }
          return null;
        })}

        <div className={styles.listScrolle}>
          {data.length > 0 && data.map((item) => {
            if (item.type !== 'bun') {
              return (
                <li key={item._id} id={item._id} className={styles.listItem}>
                  <DragIcon type="primary" />
                  <div className={styles.listItemRightSide}>
                    <img
                      src={item.image_mobile}
                      alt="Фото ингредиента"
                      className={styles.img}
                    />
                    <p className="text text_type_main-default">{item.name}</p>
                    <div className={styles.price}>
                      <span className="text text_type_digits-default mr-2">
                        {new Intl.NumberFormat('ru').format(item.price)}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <button
                      aria-label="Добавить"
                      type="button"
                      className={styles.delete}
                    />
                  </div>
                </li>
              );
            }
            return null;
          })}
        </div>

        {data.length > 0 && data.map((item) => {
          if (item.type === 'bun') {
            return (
              <li className={styles.listItemBottom} key={item._id}>
                <img
                  src={item.image_mobile}
                  alt="Фото ингредиента"
                  className={styles.img}
                />
                <p className="text text_type_main-default">
                  {item.name}
                  {' '}
                  (низ)
                </p>
                <div className={styles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {new Intl.NumberFormat('ru').format(item.price)}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <LockIcon type="secondary" />
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className={styles.totalPriceContainer}>
        <div>
          <span className="text text_type_digits-medium mr-2">
            {new Intl.NumberFormat('ru').format(totalPrice.totalPrice)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleButtonOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  onHandleButtonOrderClick: PropTypes.func.isRequired,
};

export default React.memo(BurgerConstructor);
