import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients(props: any) {
  const [current, setCurrent] = React.useState("Булки");
  const [flagOfTabClick, setFlagOfTabClick] = React.useState(false);
  const [text, setText] = React.useState("Булки");
  const [tabContainerBottomCoordinate, setTabContainerBottomCoordinate] =
    React.useState(0);
  const [bunsTopCoordinate, setBunsTopCoordinate] = React.useState(0);
  const [saucesTopCoordinate, setSaucesTopCoordinate] = React.useState(0);
  const [mainsTopCoordinate, setMainsTopCoordinate] = React.useState(0);

  function handleTabClick(e) {
    const textElem = e.target.closest("div").children[0].textContent;
    setText(textElem);
    setFlagOfTabClick(!flagOfTabClick);
  }

  useEffect(() => {
    const tabContainerBottomCoordinate = document
      .querySelector("#tabContainer")
      .getBoundingClientRect().bottom;
    setTabContainerBottomCoordinate(tabContainerBottomCoordinate);

    const bunsTopCoordinate = document
      .querySelector("#buns")
      .getBoundingClientRect().top;
    setBunsTopCoordinate(bunsTopCoordinate);

    const saucesTopCoordinate = document
      .querySelector("#sauces")
      .getBoundingClientRect().top;
    setSaucesTopCoordinate(saucesTopCoordinate);

    const mainsTopCoordinate = document
      .querySelector("#mains")
      .getBoundingClientRect().top;
    setMainsTopCoordinate(mainsTopCoordinate);
  }, []);

  useEffect(() => {
    const container = document.querySelector("#container");

    if (text === "Булки") {
      container.scrollTo(0, bunsTopCoordinate - tabContainerBottomCoordinate);
    } else if (text === "Соусы") {
      container.scrollTo(0, saucesTopCoordinate - tabContainerBottomCoordinate);
    } else if (text === "Начинки") {
      container.scrollTo(0, mainsTopCoordinate - tabContainerBottomCoordinate);
    }
  }, [flagOfTabClick]);

  return (
    <div>
      <div>
        <h2 className="mt-10 mb-5 text text_type_main-large">
          Соберите бургер
        </h2>
        <div id="tabContainer" className={styles.tabContainer}>
          <div onClick={handleTabClick}>
            <Tab
              value="Булки"
              active={current === "Булки"}
              onClick={setCurrent}
            >
              Булки
            </Tab>
          </div>
          <div onClick={handleTabClick}>
            <Tab
              value="Соусы"
              active={current === "Соусы"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </div>
          <div onClick={handleTabClick}>
            {" "}
            <Tab
              value="Начинки"
              active={current === "Начинки"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </div>
        </div>
      </div>
      <div id="container" className={`${styles.container} "mt-10 mb-10"`}>
        {!!props.data.length &&
          props.data.some((item: any) => item.type === "bun") && (
            <h3
              id="buns"
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Булки
            </h3>
          )}
        <ul className={styles.list}>
          {!!props.data.length &&
            props.data.some((item: any) => item.type === "bun") &&
            props.data.map((item: any) => {
              if (item.type === "bun") {
                return (
                  <li className={styles.listItem} key={item._id}>
                    <div
                      id={item._id}
                      className={styles.burgerIngredients}
                      onClick={props.onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото булки"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat("ru").format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                    <button
                      type="button"
                      className={`${styles.button} text text_type_main-small mb-2 mt-2`}
                    >
                      Добавить
                    </button>
                  </li>
                );
              }
            })}
        </ul>
        {!!props.data.length &&
          props.data.some((item: any) => item.type === "sauce") && (
            <h3
              id="sauces"
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Соусы
            </h3>
          )}
        <ul className={styles.list}>
          {!!props.data.length &&
            props.data.some((item: any) => item.type === "sauce") &&
            props.data.map((item: any) => {
              if (item.type === "sauce") {
                return (
                  <li className={styles.listItem} key={item._id}>
                    <div
                      id={item._id}
                      className={styles.burgerIngredients}
                      onClick={props.onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото соуса"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat("ru").format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                    <button
                      type="button"
                      className={`${styles.button} text text_type_main-small mb-2 mt-2`}
                    >
                      Добавить
                    </button>
                  </li>
                );
              }
            })}
        </ul>
        {!!props.data.length &&
          props.data.some((item: any) => item.type === "main") && (
            <h3
              id="mains"
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Начинки
            </h3>
          )}
        <ul className={styles.list}>
          {!!props.data.length &&
            props.data.some((item: any) => item.type === "main") &&
            props.data.map((item: any) => {
              if (item.type === "main") {
                return (
                  <li className={styles.listItem} key={item._id}>
                    <div
                      id={item._id}
                      className={styles.burgerIngredients}
                      onClick={props.onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото начинки"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat("ru").format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                    <button
                      type="button"
                      className={`${styles.button} text text_type_main-small mb-2 mt-2`}
                    >
                      Добавить
                    </button>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
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
  onBurgerIngredientsClick: PropTypes.func,
};

export default React.memo(BurgerIngredients);