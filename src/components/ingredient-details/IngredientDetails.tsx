import React from 'react';
import { useSelector } from 'react-redux';
import spinWhite from '../../images/spin-white.svg';
import { RootState } from '../../services/reducers';
import styles from './IngredientDetails.module.css';

function IngredientDetails() {
  const { dataBurgerIngredient } = useSelector((state: RootState) => state.ingredients);

  const handleImgLoad = (e) => {
    e.currentTarget.setAttribute('src', dataBurgerIngredient.image_large);
  };

  if (dataBurgerIngredient) {
    return (
      <>
        <div className={styles.imgContainer}>
          <img
            src={spinWhite}
            alt="Фото ингредиента"
            className={styles.img}
            onLoad={handleImgLoad}
          />
        </div>
        <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`}>
          {dataBurgerIngredient.name}
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={`${styles.listItem__text} text text_type_main-default`}>
              Калории,ккал
            </p>
            <span className="text text_type_digits-default">
              {dataBurgerIngredient.calories}
            </span>
          </li>
          <li className={styles.listItem}>
            <p className={`${styles.listItem__text} text text_type_main-default`}>
              Белки, г
            </p>
            <span className="text text_type_digits-default">
              {dataBurgerIngredient.proteins}
            </span>
          </li>
          <li className={styles.listItem}>
            <p className={`${styles.listItem__text} text text_type_main-default`}>
              Жиры, г
            </p>
            <span className="text text_type_digits-default">
              {dataBurgerIngredient.fat}
            </span>
          </li>
          <li className={styles.listItem}>
            <p className={`${styles.listItem__text} text text_type_main-default`}>
              Углеводы, г
            </p>
            <span className="text text_type_digits-default">
              {dataBurgerIngredient.carbohydrates}
            </span>
          </li>
        </ul>
      </>
    );
  } return null;
}

export default React.memo(IngredientDetails);
