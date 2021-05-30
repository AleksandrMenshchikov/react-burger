import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

function BurgerConstructor({
  ingredients,
  onHandleButtonDeleteBurgerElementClick,
  onHandleButtonOrderClick,
} : any) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const formatedData = ingredients.map((item, i) => ({ ...item, _id: item._id + i }));
    const dataBun = formatedData.filter((item) => item.type === 'bun');
    const lastDataBun = dataBun[dataBun.length - 1];
    const dataWithoutBun = [];
    formatedData.forEach((item) => {
      if (item.type !== 'bun') {
        dataWithoutBun.push(item);
      }
    });
    const arrFiltered = [];
    const arr = [lastDataBun, ...dataWithoutBun];
    arr.forEach((item) => {
      if (item !== undefined) {
        arrFiltered.push(item);
      }
    });

    setData(arrFiltered);
  }, [ingredients]);

  function handleButonClick(e) {
    const { id } = e.target.closest(`.${styles.listItem}`);
    const index = id.slice(24);
    onHandleButtonDeleteBurgerElementClick(index);
  }

  let totalPrice = 0;

  if (data.length > 0 && data[0]) {
    totalPrice = data.reduce((acc, item) => {
      if (item.type === 'bun') {
        return acc + item.price * 2;
      }
      return acc + item.price;
    }, 0);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.length > 0 && data[0].type === 'bun' && (
          <li className={styles.listItemTop}>
            <img
              src={data[0].image_mobile}
              alt="Фото ингредиента"
              className={styles.img}
            />
            <p className="text text_type_main-default">
              {data[0].name}
              {' '}
              (верх)
            </p>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {new Intl.NumberFormat('ru').format(data[0].price)}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary" />
          </li>
        )}

        <div className={styles.listScrolle}>
          {data.map((item) => {
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
                      onClick={handleButonClick}
                    />
                  </div>
                </li>
              );
            }
            return null;
          })}
        </div>

        {data.length > 0 && data[0].type === 'bun' && (
          <li className={styles.listItemBottom}>
            {' '}
            <img
              src={data[0].image_mobile}
              alt="Фото ингредиента"
              className={styles.img}
            />
            <p className="text text_type_main-default">
              {data[0].name}
              {' '}
              (низ)
            </p>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {new Intl.NumberFormat('ru').format(data[0].price)}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary" />
          </li>
        )}
      </ul>
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
          onClick={onHandleButtonOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  onHandleButtonOrderClick: PropTypes.func.isRequired,
  onHandleButtonDeleteBurgerElementClick: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }),
  ).isRequired,
};

export default React.memo(BurgerConstructor);
