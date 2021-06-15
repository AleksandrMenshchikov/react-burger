import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, LockIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructorItem.module.css';

function BurgerConstructorItem({ item, position }) {
  return (
    <li
      className={styles.listItem}
    >
      {position === 'center' && <DragIcon type="primary" />}
      <div className={
        position === 'top'
          ? styles.listItemTop
          : position === 'bottom'
            ? styles.listItemBottom
            : position === 'center'
              ? styles.listItemCenter
              : null
      }
      >
        <img
          src={item.image_mobile}
          alt="Фото ингредиента"
          className={styles.img}
        />
        <p className="text text_type_main-default">
          {item.name}
          {' '}
          {position === 'top' ? '(верх)' : position === 'bottom' ? '(низ)' : null}
        </p>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {new Intl.NumberFormat('ru').format(item.price)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        {position === 'center' ? (
          <button
            aria-label="Удалить"
            type="button"
            className={styles.delete}
          />
        ) : <LockIcon type="secondary" />}
      </div>
    </li>
  );
}

BurgerConstructorItem.prototype = {
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
  position: PropTypes.string.isRequired,
};

export default React.memo(BurgerConstructorItem);
