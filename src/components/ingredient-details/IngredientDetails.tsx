import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import spinWhite from '../../images/spin-white.svg';

function IngredientDetails({ data, isModalOverlayOpened }: any) {
  const [showSpiner, setShowSpiner] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (!isModalOverlayOpened) {
      timer = setTimeout(() => {
        setShowSpiner(true);
      }, 200);
    } else {
      clearTimeout(timer);
      setShowSpiner(false);
    }

    return () => clearTimeout(timer);
  }, [isModalOverlayOpened]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className={styles.imgContainer}>
        <img
          src={showSpiner ? spinWhite : data.image_large}
          alt="Фото ингредиента"
          className={styles.img}
        />
      </div>
      <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`}>
        {data.name}
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Калории,ккал
          </p>
          <span className="text text_type_digits-default">
            {data.calories}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Белки, г
          </p>
          <span className="text text_type_digits-default">
            {data.proteins}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Жиры, г
          </p>
          <span className="text text_type_digits-default">
            {data.fat}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Углеводы, г
          </p>
          <span className="text text_type_digits-default">
            {data.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
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
  isModalOverlayOpened: PropTypes.bool.isRequired,
};

export default React.memo(IngredientDetails);
