import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, deleteDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened } from '../../services/actions/modalOverlay';
import { deleteNumberOrderDetails } from '../../services/actions/orderDetails';
import { RootState } from '../../services/reducers';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import stylesModalOverlay from '../modal-overlay/ModalOverlay.module.css';
import Modal from '../modal/Modal';
import stylesModal from '../modal/Modal.module.css';
import OrderDetails from '../order-details/OrderDetails';
import styles from './App.module.css';
import Preload from '../preload/Preload';

function App(): JSX.Element {
  const { data } = useSelector((state: RootState) => state.ingredients);
  const { nameComponentActive } = useSelector((state: RootState) => state.modalOverlay);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());

    function closeModalOverlayByEsc(e) {
      if (e.key === 'Escape') {
        dispatch(setIsModalOverlayOpened(false));
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          dispatch(deleteDataBurgerIngredient());
          dispatch(deleteNumberOrderDetails());
        }, 200);
      }
    }

    function closeModalOverlayByButtonClick(e) {
      if (
        e.target.classList.contains(stylesModal.button)
        || e.target.classList.contains(stylesModalOverlay.modalOverlay)
      ) {
        dispatch(setIsModalOverlayOpened(false));
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          dispatch(deleteDataBurgerIngredient());
          dispatch(deleteNumberOrderDetails());
        }, 200);
      }
    }

    document.addEventListener('keydown', closeModalOverlayByEsc);
    document.addEventListener('click', closeModalOverlayByButtonClick);

    return () => {
      document.removeEventListener('keydown', closeModalOverlayByEsc);
      document.removeEventListener('click', closeModalOverlayByButtonClick);
    };
  }, []);

  if (data && data.length === 0) {
    return <Preload />;
  }
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>

      <ModalOverlay>
        {nameComponentActive === 'BurgerIngredients' ? (
          <Modal title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        ) : nameComponentActive === 'BurgerConstructor' ? (
          <Modal title="">
            <OrderDetails />
          </Modal>
        ) : null}

      </ModalOverlay>
    </>
  );
}

export default App;
