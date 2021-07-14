import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import BurgerConstructor from '../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../components/burger-ingredients/BurgerIngredients';
import IngredientDetails from '../components/ingredient-details/IngredientDetails';
import ModalOverlay from '../components/modal-overlay/ModalOverlay';
import Modal from '../components/modal/Modal';
import OrderDetails from '../components/order-details/OrderDetails';
import { RootState } from '../services/reducers';
import styles from './Home.module.css';
import Preload from '../components/preload/Preload';

function Home(): JSX.Element {
  const { nameComponentActive } = useSelector((state: RootState) => state.modalOverlay);
  const { data } = useSelector((state: RootState) => state.ingredients);
  const location = useLocation();
  // const { isLoggedIn } = useSelector((state: RootState) => state.app);
  if (data && data.length === 0) {
    return <Preload />;
  }
  if (data && data.length > 0) {
    if (location.state) {
      return (
        <Switch>
          <Route path="/ingredients/:id">
            <div style={{ marginTop: '180px' }}>
              <IngredientDetails />
            </div>
          </Route>
        </Switch>
      );
    }
    return (
      <>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>

        <ModalOverlay>
          {nameComponentActive === 'BurgerIngredients' ? (
            <Switch>
              <Route path="/ingredients/:id">
                <Modal title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              </Route>
            </Switch>
          ) : nameComponentActive === 'BurgerConstructor' ? (
            <Modal title="">
              <OrderDetails />
            </Modal>
          ) : null}
        </ModalOverlay>
      </>
    );
  }
  return null;
}

export default React.memo(Home);
