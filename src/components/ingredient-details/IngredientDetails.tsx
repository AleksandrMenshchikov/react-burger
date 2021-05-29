import React from "react";
import styles from "./IngredientDetails.module.css";
import spinWhite from "../../images/spin-white.svg";

function IngredientDetails(props: any) {
  if (!props.data) {
    return null;
  }

  const [showSpiner, setShowSpiner] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (!props.isModalOverlayOpened) {
      timer = setTimeout(() => {
        setShowSpiner(true);
      }, 200);
    } else {
      clearTimeout(timer);
      setShowSpiner(false);
    }

    return () => clearTimeout(timer);
  }, [props.isModalOverlayOpened]);

  return (
    <>
      <div className={styles.imgContainer}>
        <img
          src={showSpiner ? spinWhite : props.data.image_large}
          alt="Фото ингредиента"
          className={styles.img}
        />
      </div>
      <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`}>
        {props.data.name}
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Калории,ккал
          </p>
          <span className="text text_type_digits-default">
            {props.data.calories}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Белки, г
          </p>
          <span className="text text_type_digits-default">
            {props.data.proteins}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Жиры, г
          </p>
          <span className="text text_type_digits-default">
            {props.data.fat}
          </span>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.listItem__text} text text_type_main-default`}>
            Углеводы, г
          </p>
          <span className="text text_type_digits-default">
            {props.data.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}

export default React.memo(IngredientDetails);
