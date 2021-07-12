import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened, setNameComponentActive } from '../../services/actions/modalOverlay';
import styles from './BurgerIngredientsItem.module.css';
import { addIngredientToBurgerConstructor } from '../../services/actions/burgerConstructor';

function BurgerIngredientsItem({ ingredient }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'burgerIngredientsItem',
    item: ingredient,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(addIngredientToBurgerConstructor(item));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const handleIngredientClick = React.useCallback(
    (e) => {
      dispatch(setDataBurgerIngredient(e.currentTarget.id));
      dispatch(setIsModalOverlayOpened(true));
      dispatch(setNameComponentActive('BurgerIngredients'));
      localStorage.setItem('burgerIngredients', 'modal');
      localStorage.setItem('idIngredient', e.currentTarget.id);
      history.replace(`/ingredients/${ingredient._id}`);
    },
    [],
  );

  return (
    <li className={styles.listItem}>
      <div
        style={{ opacity }}
        ref={drag}
        id={ingredient._id}
        className={styles.burgerIngredients}
        onClick={handleIngredientClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleIngredientClick(e)}
      >
        {ingredient.counter > 0 && <Counter count={ingredient.counter} size="default" />}
        <img
          src={ingredient.image}
          alt="Фото соуса"
          className="pl-4 pr-4"
        />
        <div className={`${styles.price} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">
            {new Intl.NumberFormat('ru').format(ingredient.price)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <h5
          className={`${styles.listItem__text} text text_type_main-default`}
        >
          {ingredient.name}
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
