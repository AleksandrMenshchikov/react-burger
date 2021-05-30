import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header/AppHeader';
import BurgerIngridients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import styles from './App.module.css';
import stylesBurgerIngredients from '../burger-ingredients/BurgerIngredients.module.css';
import stylesModalOverlay from '../modal-overlay/ModalOverlay.module.css';
import stylesModal from '../modal/Modal.module.css';
import { api } from '../../utils/api';
import spinWhite from '../../images/spin-white.svg';

const root = document.querySelector('#root');

function App(): JSX.Element {
  const [idBurgerIngredients, setIdBurgerIngredients] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [dataBurgerConstructor, setDataBurgerConstructor] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isModalOverlayOpened, setIsModalOverlayOpened] = React.useState(false);
  const [nameComponentActive, setNameComponentActive] = React.useState('');

  React.useEffect(() => {
    api
      .getIngredients()
      .then((res) => {
        const { data: arr } = res;
        setData(arr);
        root.setAttribute('style', 'opacity: 1');
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });

    function closeModalOverlayByEsc(e) {
      if (e.key === 'Escape') {
        setIsModalOverlayOpened(false);
      }
    }

    function closeModalOverlayByButtonClick(e) {
      if (
        e.target.classList.contains(stylesModal.button)
        || e.target.classList.contains(stylesModalOverlay.modalOverlay)
      ) {
        setIsModalOverlayOpened(false);
      }
    }

    document.addEventListener('keydown', closeModalOverlayByEsc);
    document.addEventListener('click', closeModalOverlayByButtonClick);

    return () => {
      document.removeEventListener('keydown', closeModalOverlayByEsc);
      document.removeEventListener('click', closeModalOverlayByButtonClick);
    };
  }, []);

  const dataForIngredientDetails = React.useMemo(() => {
    if (data && data.length > 0) {
      return data.find((item) => item._id === idBurgerIngredients);
    }
    return null;
  }, [data, idBurgerIngredients]);

  const burgerIngredientsClick = React.useCallback((e) => {
    setIdBurgerIngredients(
      e.target.closest(`.${stylesBurgerIngredients.listItem}`).id,
    );
    setIsModalOverlayOpened(true);
    setNameComponentActive('BurgerIngredients');
  }, []);

  const handleAddIngredientsButtonClick = React.useCallback(
    (foundData) => {
      setDataBurgerConstructor([...dataBurgerConstructor, foundData]);
    },
    [dataBurgerConstructor],
  );

  const handleButtonOrderClick = React.useCallback(() => {
    setIsModalOverlayOpened(true);
    setNameComponentActive('BurgerConstructor');
  }, []);

  const handleButtonDeleteBurgerElementClick = React.useCallback(
    (index = 0) => {
      const filteredData = dataBurgerConstructor.filter(
        (item, i) => i !== Number(index),
      );
      setDataBurgerConstructor(filteredData);
    },
    [dataBurgerConstructor],
  );

  if (data && data.length === 0) {
    return ReactDOM.createPortal(
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
      document.getElementById('preload-modal-root'),
    );
  }
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        {data && data.length > 0 && (
        <BurgerIngridients
          data={data}
          onBurgerIngredientsClick={burgerIngredientsClick}
          onHandleAddIngredientsButtonClick={
                handleAddIngredientsButtonClick
              }
        />
        )}
        <BurgerConstructor
          onHandleButtonOrderClick={handleButtonOrderClick}
          ingredients={dataBurgerConstructor}
          onHandleButtonDeleteBurgerElementClick={
              handleButtonDeleteBurgerElementClick
            }
        />
      </main>

      <ModalOverlay isModalOverlayOpened={isModalOverlayOpened}>
        <Modal nameComponentActive={nameComponentActive}>
          {nameComponentActive === 'BurgerIngredients' ? (
            <IngredientDetails
              data={dataForIngredientDetails}
              isModalOverlayOpened={isModalOverlayOpened}
            />
          ) : nameComponentActive === 'BurgerConstructor' ? (
            <OrderDetails />
          ) : null}
        </Modal>
      </ModalOverlay>
    </>
  );
}

export default App;
