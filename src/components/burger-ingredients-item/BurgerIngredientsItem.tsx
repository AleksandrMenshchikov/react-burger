import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened, setNameComponentActive } from '../../services/actions/modalOverlay';
import styles from './BurgerIngredientsItem.module.css';

function BurgerIngredientsItem({ item }) {
  const dispatch = useDispatch();

  const handleLiClick = (e) => {
    dispatch(setDataBurgerIngredient(e.currentTarget.id));
    dispatch(setIsModalOverlayOpened(true));
    dispatch(setNameComponentActive('BurgerIngredients'));
  };

  return (
    <li className={styles.listItem}>
      <div
        id={item._id}
        className={styles.burgerIngredients}
        onClick={handleLiClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleLiClick}
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
};

export default React.memo(BurgerIngredientsItem);
