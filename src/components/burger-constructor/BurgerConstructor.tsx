import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
  DragIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props: any) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const formatedData = props.data.map((item, i) => {
      return { ...item, _id: item._id + i };
    });
    const dataBun = formatedData.filter((item) => item.type === "bun");
    const lastDataBun = dataBun[dataBun.length - 1];
    const dataWithoutBun = formatedData.map((item) => {
      if (item.type !== "bun") {
        return item;
      }
    });
    const arrFiltered: any = [];
    const arr = [lastDataBun, ...dataWithoutBun];
    arr.forEach((item) => {
      if (item !== undefined) {
        arrFiltered.push(item);
      }
    });

    setData(arrFiltered);
  }, [props.data]);

  function handleButonClick(e) {
    const id = e.target.closest(`.${styles.listItem}`).id;
    const index = id.slice(24);
    props.onHandleButtonDeleteBurgerElementClick(index);
  }
  console.log(data);

  let totalPrice = 0;

  if (data.length > 0 && data[0]) {
    totalPrice = data.reduce((acc, item) => {
      if (item.type === "bun") {
        return acc + item.price * 2;
      } else {
        return acc + item.price;
      }
    }, 0);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.length > 0 && data[0].type === "bun" && (
          <li className={styles.listItemTop}>
            <img
              src={data[0].image_mobile}
              alt="Фото ингредиента"
              className={styles.img}
            />
            <p className="text text_type_main-default">{data[0].name} (верх)</p>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {new Intl.NumberFormat("ru").format(data[0].price)}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary" />
          </li>
        )}

        <div className={styles.listScrolle}>
          {data.map((item) => {
            if (item.type !== "bun") {
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
                        {new Intl.NumberFormat("ru").format(item.price)}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                    <button
                      type="button"
                      className={styles.delete}
                      onClick={handleButonClick}
                    />
                  </div>
                </li>
              );
            }
          })}
        </div>

        {data.length > 0 && data[0].type === "bun" && (
          <li className={styles.listItemBottom}>
            {" "}
            <img
              src={data[0].image_mobile}
              alt="Фото ингредиента"
              className={styles.img}
            />
            <p className="text text_type_main-default">{data[0].name} (низ)</p>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {new Intl.NumberFormat("ru").format(data[0].price)}
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
            {new Intl.NumberFormat("ru").format(totalPrice)}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={props.onHandleButtonOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  onHandleButtonOrderClick: PropTypes.func,
  onHandleButtonDeleteBurgerElementClick: PropTypes.func,
  data: PropTypes.arrayOf(
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
    })
  ),
};

export default React.memo(BurgerConstructor);
