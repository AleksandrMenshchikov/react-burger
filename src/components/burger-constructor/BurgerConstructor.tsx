import React from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from '../burger-constructor-item/BurgerConstructorItem';
import { DataContext } from '../../utils/appContext';
import styles from './BurgerConstructor.module.css';

const initialState = { totalPrice: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'reduce':
      return {
        ...state,
        totalPrice: action.payload,
      };
    default:
      return state;
  }
}

function BurgerConstructor({ onHandleButtonOrderClick } : any) {
  const [totalPrice, dispatch] = React.useReducer(reducer, initialState, undefined);

  const data = React.useContext(DataContext);

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

  React.useEffect(() => {
    if (data && data.length > 0) {
      dispatch({
        type: 'reduce',
        payload: filteredData.reduce((acc, currentItem) => {
          if (currentItem.type === 'bun') {
            return acc + currentItem.price * 2;
          }
          return acc + currentItem.price;
        }, 0),
      });
    }
  }, []);

  function handleButtonOrderClick() {
    const arrayOfId = data.map((item) => item._id);
    onHandleButtonOrderClick(arrayOfId);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {filteredData.length > 0 && filteredData.map((item) => {
          if (item.type === 'bun') {
            return <BurgerConstructorItem item={item} position="top" key={item._id} />;
          }
          return null;
        })}

        <div className={styles.listScrolle}>
          {data.length > 0 && data.map((item) => {
            if (item.type !== 'bun') {
              return <BurgerConstructorItem item={item} position="center" key={item._id} />;
            }
            return null;
          })}
        </div>

        {filteredData.length > 0 && filteredData.map((item) => {
          if (item.type === 'bun') {
            return <BurgerConstructorItem item={item} position="bottom" key={item._id} />;
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
