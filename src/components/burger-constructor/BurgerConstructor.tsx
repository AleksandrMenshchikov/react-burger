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
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItemTop}>
          <img
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            alt="Фото ингредиента"
            className={styles.img}
          />
          <p className="text text_type_main-default">
            Краторная булка N-200i (верх)
          </p>
          <div className={styles.price}>
            <span className="text text_type_digits-default mr-2">20</span>
            <CurrencyIcon type="primary" />
          </div>
          <LockIcon type="secondary" />
        </li>
        <div className={styles.listScrolle}>
          
          <li className={styles.listItem}>
            <DragIcon type="primary" />
            <div className={styles.listItemRightSide}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
                alt="Фото ингредиента"
                className={styles.img}
              />
              <p className="text text_type_main-default">
                Соус традиционный галактический
              </p>
              <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">30</span>
                <CurrencyIcon type="primary" />
              </div>
              <button type="button" className={styles.delete} />
            </div>
          </li>
          <li className={styles.listItem}>
            <DragIcon type="primary" />
            <div className={styles.listItemRightSide}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
                alt="Фото ингредиента"
                className={styles.img}
              />
              <p className="text text_type_main-default">
                Соус традиционный галактический
              </p>
              <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">30</span>
                <CurrencyIcon type="primary" />
              </div>
              <button type="button" className={styles.delete} />
            </div>
          </li>
          <li className={styles.listItem}>
            <DragIcon type="primary" />
            <div className={styles.listItemRightSide}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
                alt="Фото ингредиента"
                className={styles.img}
              />
              <p className="text text_type_main-default">
                Соус традиционный галактический
              </p>
              <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">30</span>
                <CurrencyIcon type="primary" />
              </div>
              <button type="button" className={styles.delete} />
            </div>
          </li>
        </div>
        <li className={styles.listItemBottom}>
          {" "}
          <img
            src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            alt="Фото ингредиента"
            className={styles.img}
          />
          <p className="text text_type_main-default">
            Краторная булка N-200i (низ)
          </p>
          <div className={styles.price}>
            <span className="text text_type_digits-default mr-2">20</span>
            <CurrencyIcon type="primary" />
          </div>
          <LockIcon type="secondary" />
        </li>
      </ul>
      <div className={styles.totalPriceContainer}>
        <div>
          <span className="text text_type_digits-medium mr-2">
            {new Intl.NumberFormat("ru").format(1610)}
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
};

export default React.memo(BurgerConstructor);