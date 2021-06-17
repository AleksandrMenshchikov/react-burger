import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../../services/actions/ingredients';
import { getNumberOrderDetails } from '../../services/actions/orderDetails';
import { RootState } from '../../services/reducers';
import BurgerConstructorItem from '../burger-constructor-item/BurgerConstructorItem';
import styles from './BurgerConstructor.module.css';
import BurgerConstructorScrolle from '../burger-constructor-scrolle/BurgerConstructorScrolle';

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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.burgerConstructor);
  const { data: dataIngredients } = useSelector((state: RootState) => state.ingredients);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'burgerIngredientsItem',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  let containerInnerAtive;
  if (canDrop && !isOver) {
    containerInnerAtive = styles.containerInner_canDrop;
  } else if (canDrop && isOver) {
    containerInnerAtive = styles.containerInner_isOver;
  }

  const [totalPrice, despatch] = React.useReducer(reducer, initialState, undefined);

  React.useEffect(() => {
    if (data && data.length > 0) {
      despatch({
        type: 'reduce',
        payload: data.reduce((acc, currentItem) => {
          if (currentItem.type === 'bun') {
            return acc + currentItem.price * 2;
          }
          return acc + currentItem.price;
        }, 0),
      });
    }
    const dataIngredientsWithCounters = dataIngredients.map((item) => {
      const id = item._id;
      let count = 0;
      data.forEach((elem) => {
        if (elem._id.slice(0, 24) === id) {
          count += 1;
        }
      });
      return {
        ...item,
        counter: count,
      };
    });
    dispatch(setIngredients(dataIngredientsWithCounters));
  }, [data]);

  function handleButtonOrderClick() {
    const arrayOfId = data.map((item) => item._id.slice(0, 24));
    dispatch(getNumberOrderDetails(arrayOfId));
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.containerInner} ${containerInnerAtive}`} ref={drop}>
        {data && data.length > 0 ? (
          <ul className={styles.list}>
            {data.length > 0 && data.map((item) => {
              if (item.type === 'bun') {
                return <BurgerConstructorItem ingredient={item} position="top" key={item._id} />;
              }
              return null;
            })}

            <BurgerConstructorScrolle />

            {data.length > 0 && data.map((item) => {
              if (item.type === 'bun') {
                return <BurgerConstructorItem ingredient={item} position="bottom" key={item._id} />;
              }
              return null;
            })}
          </ul>
        ) : (
          <p className={`${styles.defaultText} text_type_main-medium text_color_inactive`}>
            Чтобы собрать бургер, перетащите сюда нужные ингредиенты
          </p>
        )}

      </div>
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

export default React.memo(BurgerConstructor);
