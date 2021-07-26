import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../services/reducers';
import styles from './OrderTapeDetails.module.css';
import stone from '../../images/stone.svg';

function OrderTapeDetails() {
  const { data: oldData } = useSelector((state: RootState) => state.ordersTape);

  if (oldData && oldData.length > 0) {
    const data = {
      ...oldData[0],
      ingredients: oldData[0].ingredients.reduce((acc, item) => {
        let amount = 0;
        oldData[0].ingredients.forEach((ingredient) => {
          if (ingredient._id === item._id) {
            amount += 1;
          }
        });
        if (!acc.find((elem) => elem._id === item._id)) {
          return [...acc, { ...item, amount }];
        }
        return acc;
      }, []),
    };

    return (
      <div className={styles.container}>
        <span className={`${styles.number} text text_type_digits-default`}>
          #
          {data.number}
        </span>
        <p className={`${styles.title} text text_type_main-medium`}>{data.name}</p>
        <p className={`${styles.subtitle} text text_type_main-default`}>{data.status === 'done' ? 'Выполнен' : 'В работе'}</p>
        <p className={`${styles.title} text text_type_main-medium`}>Состав:</p>
        <div className={styles.innerContainer}>
          <ul className={styles.list}>
            {data.ingredients.map((ingredient) => (
              <div key={uuidv4()} className={styles.ingredient}>
                <div
                  className={styles.listItemImageContainer}
                >
                  <img className={styles.listItemImage} src={ingredient.image_mobile} alt="Фото ингредиента" />
                </div>
                <p className={`${styles.text} text text_type_main-default`}>{ingredient.name}</p>
                <span className={`${styles.price} text text_type_digits-default`}>
                  {ingredient._id === '60d3b41abdacab0026a733c6' || ingredient._id === '60d3b41abdacab0026a733c7'
                    ? 2
                    : ingredient.amount}
                  {' '}
                  x
                  {' '}
                  {new Intl.NumberFormat('ru').format(ingredient.price)}
                </span>
                <img src={stone} alt="Камень" />
              </div>
            ))}
          </ul>
        </div>
        <div className={styles.total}>
          <span className="text text_type_main-default text_color_inactive">{data.createdAt}</span>
          <span className={`${styles.total} text text_type_digits-default`}>
            {new Intl.NumberFormat('ru').format(data.totalPrice)}
            {' '}
            <img className={styles.img} src={stone} alt="Камень" />
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default React.memo(OrderTapeDetails);
