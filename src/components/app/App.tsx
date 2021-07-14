import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, deleteDataBurgerIngredient, setDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened } from '../../services/actions/modalOverlay';
import { deleteNumberOrderDetails } from '../../services/actions/orderDetails';
import { setIsResetPasswordActive } from '../../services/actions/app';
import { RootState } from '../../services/reducers';
import AppHeader from '../app-header/AppHeader';
import stylesModalOverlay from '../modal-overlay/ModalOverlay.module.css';
import stylesModal from '../modal/Modal.module.css';
import Home from '../../pages/Home';
import NotFound from '../not-found/NotFound';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword1 from '../../pages/ForgotPassword1';
import ForgotPassword2 from '../../pages/ForgotPassword2';
import ProfilePage from '../../pages/ProfilePage';
import ProtectedRoute from '../protected-route/ProtectedRoute';

function App(): JSX.Element {
  const { isResetPasswordActive } = useSelector((state: RootState) => state.app);
  const { data } = useSelector((state: RootState) => state.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isResetPasswordActive) {
      history.push('/reset-password');
      dispatch(setIsResetPasswordActive(false));
    }
  }, [isResetPasswordActive, history]);

  useEffect(() => {
    dispatch(getIngredients());
    if (location.pathname.split('/').includes('ingredients')) {
      history.replace(location.pathname, 'ingredients');
    }
  }, []);

  useEffect(() => {
    if (location.state === 'ingredients') {
      const splitedLocation = location.pathname.split('/');
      if (data.length > 0) {
        dispatch(setDataBurgerIngredient(splitedLocation[2]));
      }
    }
  }, [location, data]);

  useEffect(() => {
    function closeModalOverlayByEsc(e) {
      if (e.key === 'Escape') {
        dispatch(setIsModalOverlayOpened(false));
        history.replace('/');
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
        history.replace('/');
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

  return (
    <>
      <AppHeader />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ingredients/:id">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword1 />
        </Route>
        <Route path="/reset-password">
          <ForgotPassword2 />
        </Route>
        <ProtectedRoute component={ProfilePage} path="/profile" pathToRedirect="/login" />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
