import React from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngridients from "../burger-ingredients/BurgerIngredients";
import PopupBurgerIngredients from "../popup-burger-ingredients/PopupBurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import PopupOrderDetails from "../popup-order-details/PopupOrderDetails";
import styles from "./App.module.css";
import stylesPopupBurgerIngredients from "../popup-burger-ingredients/PopupBurgerIngredients.module.css";
import stylesBurgerIngredients from "../burger-ingredients/BurgerIngredients.module.css";
import stylesPopupOrderDetails from "../popup-order-details/PopupOrderDetails.module.css";
import data from "../../utils/data";

function App() {
  const [idBurgerIngredients, setIdBurgerIngredients] = React.useState(
    data[0]._id
  );
  const [isPopupBurgerIngredientsOpened, setIsPopupBurgerIngredientsOpened] =
    React.useState(false);
  const [isPopupOrderDetailsOpened, setIsPopupOrderDetailsOpened] =
    React.useState(false);

  const dataForPopupBurgerIngredients = data.filter(
    (item) => item._id === idBurgerIngredients
  )[0];

  React.useEffect(() => {
    function closePopupByEsc(e) {
      if (e.key === "Escape") {
        setIsPopupBurgerIngredientsOpened(false);
        setIsPopupOrderDetailsOpened(false);
      }
    }
    document.addEventListener("keydown", closePopupByEsc);

    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, []);

  function burgerIngredientsClick(e) {
    setIdBurgerIngredients(
      e.target.closest(`.${stylesBurgerIngredients.burgerIngredients}`).id
    );
    setIsPopupBurgerIngredientsOpened(true);
  }

  function handlePopupBurgerIngredientsCloseClick(e) {
    if (
      e.target.classList.contains(stylesPopupBurgerIngredients.popup) ||
      e.target.classList.contains(stylesPopupBurgerIngredients.button)
    ) {
      setIsPopupBurgerIngredientsOpened(false);
    }
  }

  function handlePopupOrderDetailsCloseClick(e) {
    if (
      e.target.classList.contains(stylesPopupOrderDetails.popup) ||
      e.target.classList.contains(stylesPopupOrderDetails.button)
    ) {
      setIsPopupOrderDetailsOpened(false);
    }
  }

  function handleButtonOrderClick() {
    setIsPopupOrderDetailsOpened(true);
  }

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngridients
          data={data}
          onBurgerIngredientsClick={burgerIngredientsClick}
        />
        <BurgerConstructor onHandleButtonOrderClick={handleButtonOrderClick} />
      </main>

      <PopupBurgerIngredients
        data={dataForPopupBurgerIngredients}
        onHandlePopupBurgerIngredientsCloseClick={
          handlePopupBurgerIngredientsCloseClick
        }
        isPopupBurgerIngredientsOpened={isPopupBurgerIngredientsOpened}
      />
      <PopupOrderDetails
        onHandlePopupOrderDetailsCloseClick={handlePopupOrderDetailsCloseClick}
        isPopupOrderDetailsOpened={isPopupOrderDetailsOpened}
      />
    </>
  );
}

export default App;
