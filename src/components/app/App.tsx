import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, deleteDataBurgerIngredient, setDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened } from '../../services/actions/modalOverlay';
import { deleteNumberOrderDetails } from '../../services/actions/orderDetails';
import { setIsResetPasswordActive, setIsLoggedIn } from '../../services/actions/app';
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
import { getCookie, setCookie } from '../../utils/cookies';
import { api } from '../../utils/api';
import { setEmailProfileValue, setNameProfileValue } from '../../services/actions/profile';

function App(): JSX.Element {
  const { isLoggedIn, isResetPasswordActive } = useSelector((state: RootState) => state.app);
  const { data } = useSelector((state: RootState) => state.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   const accessToken = getCookie('accessToken');
  //   if (accessToken) {
  //     dispatch(setIsLoggedIn(true));
  //     api.getUser(accessToken)
  //       .then((res) => {
  //         if (res.success) {
  //           dispatch(setEmailProfileValue(res.user.email));
  //           dispatch(setNameProfileValue(res.user.name));
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     const token = localStorage.getItem('refreshToken');
  //     if (token) {
  //       api.postRefreshToken(token)
  //         .then((res) => {
  //           if (res.success) {
  //             const authToken = res.accessToken.split('Bearer ')[1];
  //             const { refreshToken } = res;
  //             if (authToken) {
  //               setCookie('accessToken', authToken, { expires: 1200 });
  //               localStorage.setItem('refreshToken', refreshToken);
  //               dispatch(setIsLoggedIn(true));
  //               dispatch(setEmailProfileValue(res.user.email));
  //               dispatch(setNameProfileValue(res.user.name));
  //             }
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (isResetPasswordActive) {
      history.push('/reset-password');
      dispatch(setIsResetPasswordActive(false));
    }
  }, [isResetPasswordActive, history]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(getIngredients());
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('burgerIngredients', 'page');
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    if (data) {
      const idIngredient = localStorage.getItem('idIngredient');
      if (idIngredient) {
        dispatch(setDataBurgerIngredient(idIngredient));
      }
    }
  }, [data]);

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
