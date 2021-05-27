import React from "react";
import ReactDOM from "react-dom";
import AppHeader from "../app-header/AppHeader";
import BurgerIngridients from "../burger-ingredients/BurgerIngredients";
import PopupBurgerIngredients from "../popup-burger-ingredients/PopupBurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import PopupOrderDetails from "../popup-order-details/PopupOrderDetails";
import styles from "./App.module.css";
import stylesPopupBurgerIngredients from "../popup-burger-ingredients/PopupBurgerIngredients.module.css";
import stylesBurgerIngredients from "../burger-ingredients/BurgerIngredients.module.css";
import stylesPopupOrderDetails from "../popup-order-details/PopupOrderDetails.module.css";
import { api } from "../../utils/api";
import spinWhite from "../../images/spin-white.svg";

const root = document.querySelector("#root");

function App() {
  const [idBurgerIngredients, setIdBurgerIngredients] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isPopupBurgerIngredientsOpened, setIsPopupBurgerIngredientsOpened] =
    React.useState(false);
  const [isPopupOrderDetailsOpened, setIsPopupOrderDetailsOpened] =
    React.useState(false);

  const dataForPopupBurgerIngredients = React.useMemo(() => {
    if (data.length > 0) {
      return data.find((item) => item._id === idBurgerIngredients);
    }
  }, [idBurgerIngredients, data]);

  React.useEffect(() => {
    api
      .getIngredients()
      .then((res) => {
        const { data } = res;
        setData(data);
        root.setAttribute("style", "opacity: 1");
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });

    function closePopupByEsc(e) {
      if (e.key === "Escape") {
        setIsPopupBurgerIngredientsOpened(false);
        setIsPopupOrderDetailsOpened(false);
      }
    }

    document.addEventListener("keydown", closePopupByEsc);

    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, []);

  const burgerIngredientsClick = React.useCallback((e) => {
    setIdBurgerIngredients(
      e.target.closest(`.${stylesBurgerIngredients.burgerIngredients}`).id
    );
    setIsPopupBurgerIngredientsOpened(true);
  }, []);

  const handlePopupBurgerIngredientsCloseClick = React.useCallback((e) => {
    if (
      e.target.classList.contains(stylesPopupBurgerIngredients.popup) ||
      e.target.classList.contains(stylesPopupBurgerIngredients.button)
    ) {
      setIsPopupBurgerIngredientsOpened(false);
    }
  }, []);

  const handlePopupOrderDetailsCloseClick = React.useCallback((e) => {
    if (
      e.target.classList.contains(stylesPopupOrderDetails.popup) ||
      e.target.classList.contains(stylesPopupOrderDetails.button)
    ) {
      setIsPopupOrderDetailsOpened(false);
    }
  }, []);

  const handleButtonOrderClick = React.useCallback(() => {
    setIsPopupOrderDetailsOpened(true);
  }, []);

  if (data.length === 0) {
    return ReactDOM.createPortal(
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isError ? (
          <h1 className="text text_type_main-large">
            Ошибка на сервере. Попробуйте зайти на сайт чуть позже.
          </h1>
        ) : (
          <img src={spinWhite} alt="Загрузка данных" />
        )}
      </div>,
      document.getElementById("preload-modal-root")
    );
  } else {
    return (
      <>
        <AppHeader />
        <main className={`${styles.main} pl-5 pr-5`}>
          {data.length > 0 && (
            <BurgerIngridients
              data={data}
              onBurgerIngredientsClick={burgerIngredientsClick}
            />
          )}
          <BurgerConstructor
            onHandleButtonOrderClick={handleButtonOrderClick}
          />
        </main>

        <PopupBurgerIngredients
          data={dataForPopupBurgerIngredients}
          onHandlePopupBurgerIngredientsCloseClick={
            handlePopupBurgerIngredientsCloseClick
          }
          isPopupBurgerIngredientsOpened={isPopupBurgerIngredientsOpened}
        />
        <PopupOrderDetails
          onHandlePopupOrderDetailsCloseClick={
            handlePopupOrderDetailsCloseClick
          }
          isPopupOrderDetailsOpened={isPopupOrderDetailsOpened}
        />
      </>
    );
  }
}

export default App;
