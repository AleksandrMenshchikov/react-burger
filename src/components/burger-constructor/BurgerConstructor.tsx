import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setIngredients } from '../../services/actions/ingredients';
import { getNumberOrderDetails } from '../../services/actions/orderDetails';
import { updateTotalPriceToBurgerConstructor } from '../../services/actions/burgerConstructor';
import { RootState } from '../../services/reducers';
import BurgerConstructorItem from '../burger-constructor-item/BurgerConstructorItem';
import styles from './BurgerConstructor.module.css';
import BurgerConstructorScrolle from '../burger-constructor-scrolle/BurgerConstructorScrolle';

function BurgerConstructor() {
  const { isLoggedIn } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, totalPrice } = useSelector((state: RootState) => state.burgerConstructor);
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

  React.useEffect(() => {
    dispatch(updateTotalPriceToBurgerConstructor());

    const dataIngredientsWithCounters = dataIngredients.map((item) => {
      const id = item._id;
      let count = 0;
      data.forEach((elem) => {
        if (elem._id === id) {
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
    if (!isLoggedIn) {
      history.replace('/login', 'constructor');
    } else {
      const arrayOfId = data.map((item) => item._id);
      dispatch(getNumberOrderDetails(arrayOfId));
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.containerInner} ${containerInnerAtive}`} ref={drop}>
        {data && data.length > 0 ? (
          <ul className={styles.list}>
            {data.length > 0 && data.map((item) => {
              if (item.type === 'bun') {
                return <BurgerConstructorItem ingredient={item} position="top" key={item._uid} />;
              }
              return null;
            })}

            <BurgerConstructorScrolle />

            {data.length > 0 && data.map((item) => {
              if (item.type === 'bun') {
                return <BurgerConstructorItem ingredient={item} position="bottom" key={item._uid} />;
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
            {new Intl.NumberFormat('ru').format(totalPrice)}
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
