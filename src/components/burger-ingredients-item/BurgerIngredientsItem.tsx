import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredientsItem.module.css';

function BurgerIngredientsItem({ item, onBurgerIngredientsClick }) {
  return (
    <li className={styles.listItem} id={item._id}>
      <div
        className={styles.burgerIngredients}
        onClick={onBurgerIngredientsClick}
        role="button"
        tabIndex={0}
        onKeyDown={onBurgerIngredientsClick}
      >
        <Counter count={1} size="default" />
        <img
          src={item.image}
          alt="Фото соуса"
          className="pl-4 pr-4"
        />
        <div className={`${styles.price} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">
            {new Intl.NumberFormat('ru').format(item.price)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <h5
          className={`${styles.listItem__text} text text_type_main-default`}
        >
          {item.name}
        </h5>
      </div>
    </li>
  );
}

BurgerIngredientsItem.prototype = {
  item: PropTypes.shape({
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
  }).isRequired,
  onBurgerIngredientsClick: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredientsItem);
