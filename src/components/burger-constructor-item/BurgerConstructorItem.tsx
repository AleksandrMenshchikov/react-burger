import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, LockIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './BurgerConstructorItem.module.css';
import {
  deleteIngredientFromBurgerConstructor,
  setIngredientsToBurgerConstructor,
} from '../../services/actions/burgerConstructor';
import { RootState } from '../../services/reducers';

function BurgerConstructorItem({ ingredient, position }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.burgerConstructor);

  const [{ isDragging, item }, drag] = useDrag(() => ({
    type: 'burgerConstructorItem',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'burgerConstructorItem',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const id = isOver && ingredient._uid;

  React.useEffect(() => {
    if (item) {
      const dragElementId = item._uid;
      const dropElementId = id;
      if (dragElementId && dropElementId) {
        const indexDragElement = data.findIndex((elem) => elem._uid === dragElementId);
        const indexDropElement = data.findIndex((elem) => elem._uid === dropElementId);
        const dragElement = data.find((elem) => elem._uid === dragElementId);
        const dropElement = data.find((elem) => elem._uid === dropElementId);
        let newData;
        if (dragElementId !== dropElementId) {
          newData = data.map((elem, index) => {
            if (index === indexDragElement) {
              return dropElement;
            }
            if (index === indexDropElement) {
              return dragElement;
            }
            return elem;
          });
        } else {
          newData = null;
        }
        if (newData) {
          dispatch(setIngredientsToBurgerConstructor(newData));
        }
      }
    }
  }, [item, id]);

  function handleButtonClick() {
    dispatch(deleteIngredientFromBurgerConstructor(ingredient._uid));
  }

  return (
    <li
      ref={position === 'center' ? drag : null}
      style={{ opacity }}
      className={styles.listItem}
    >
      {position === 'center' && <DragIcon type="primary" />}
      <div
        ref={position === 'center' ? drop : null}
        className={
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
          src={ingredient.image_mobile}
          alt="???????? ??????????????????????"
          className={styles.img}
        />
        <p className="text text_type_main-default">
          {ingredient.name}
          {' '}
          {position === 'top' ? '(????????)' : position === 'bottom' ? '(??????)' : null}
        </p>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {new Intl.NumberFormat('ru').format(ingredient.price)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        {position === 'center' ? (
          <button
            aria-label="??????????????"
            type="button"
            className={styles.delete}
            onClick={handleButtonClick}
          />
        ) : <LockIcon type="secondary" />}
      </div>
    </li>
  );
}

BurgerConstructorItem.prototype = {
  ingredient: PropTypes.shape({
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
