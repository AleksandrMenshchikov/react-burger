import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import PreloadModal from '../preload-modal/PreloadModal';
import styles from './App.module.css';
import stylesBurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem.module.css';
import stylesModalOverlay from '../modal-overlay/ModalOverlay.module.css';
import stylesModal from '../modal/Modal.module.css';
import { DataContext } from '../../utils/appContext';
import { api } from '../../utils/api';

const root = document.querySelector('#root');
const preloadModalRoot = document.getElementById('preload-modal-root');

function App(): JSX.Element {
  const [idBurgerIngredients, setIdBurgerIngredients] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isModalOverlayOpened, setIsModalOverlayOpened] = React.useState(false);
  const [nameComponentActive, setNameComponentActive] = React.useState('');
  const [dataOrderDetails, setDataOrderDetails] = React.useState(0);

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
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => setDataOrderDetails(0), 200);
      }
    }

    function closeModalOverlayByButtonClick(e) {
      if (
        e.target.classList.contains(stylesModal.button)
         || e.target.classList.contains(stylesModalOverlay.modalOverlay)
      ) {
        setIsModalOverlayOpened(false);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => setDataOrderDetails(0), 200);
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
      e.target.closest(`.${stylesBurgerIngredientsItem.listItem}`).id,
    );
    setIsModalOverlayOpened(true);
    setNameComponentActive('BurgerIngredients');
  }, []);

  const handleButtonOrderClick = React.useCallback((arrayOfId) => {
    setIsModalOverlayOpened(true);
    setNameComponentActive('BurgerConstructor');
    api.postOrders(arrayOfId)
      .then((res) => setDataOrderDetails(res.order.number))
      .catch((err) => {
        setDataOrderDetails(-1);
        console.error(err);
      });
  }, []);

  if (data && data.length === 0) {
    return ReactDOM.createPortal(<PreloadModal isError={isError} />, preloadModalRoot);
  }
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <DataContext.Provider value={data}>
          {data && data.length > 0 && (
          <BurgerIngredients
            onBurgerIngredientsClick={burgerIngredientsClick}
          />
          )}
          <BurgerConstructor
            onHandleButtonOrderClick={handleButtonOrderClick}
          />
        </DataContext.Provider>
      </main>

      <ModalOverlay isModalOverlayOpened={isModalOverlayOpened}>
        <Modal nameComponentActive={nameComponentActive}>
          {nameComponentActive === 'BurgerIngredients' ? (
            <IngredientDetails
              data={dataForIngredientDetails}
              isModalOverlayOpened={isModalOverlayOpened}
            />
          ) : nameComponentActive === 'BurgerConstructor' ? (
            <OrderDetails dataOrderDetails={dataOrderDetails} />
          ) : null}
        </Modal>
      </ModalOverlay>
    </>
  );
}

export default App;
