import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, deleteDataBurgerIngredient, setDataBurgerIngredient } from '../../services/actions/ingredients';
import { setIsModalOverlayOpened } from '../../services/actions/modalOverlay';
import { deleteNumberOrderDetails } from '../../services/actions/orderDetails';
import { setIsLoggedIn, setIsResetPasswordActive } from '../../services/actions/app';
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
import { api } from '../../utils/api';
import { getCookie, setCookie } from '../../utils/cookies';
import { setEmailProfileValue, setNameProfileValue } from '../../services/actions/profile';
import OrderTapePage from '../../pages/OrderTapePage';

function App(): JSX.Element {
  const { isResetPasswordActive } = useSelector((state: RootState) => state.app);
  const { isModalOverlayOpened } = useSelector((state: RootState) => state.modalOverlay);
  const { data } = useSelector((state: RootState) => state.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch('/ingredients/:id');

  useEffect(() => {
    const { state } = location;
    const background = (state as any)?.background;
    if (background && location.pathname.split('/').includes('ingredients') && !isModalOverlayOpened) {
      history.push('/');
    }
    if (background && location.pathname.split('/').includes('feed') && !isModalOverlayOpened) {
      history.push('/feed');
    }
    if (background
      && location.pathname.split('/').includes('profile')
      && location.pathname.split('/').includes('orders')
      && !isModalOverlayOpened) {
      history.push('/profile/orders');
    }
  }, [location, isModalOverlayOpened]);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(setIsLoggedIn(true));
      api.getUser(accessToken)
        .then((res) => {
          if (res.success) {
            dispatch(setEmailProfileValue(res.user.email));
            dispatch(setNameProfileValue(res.user.name));
            dispatch({ type: 'WS_CONNECTION_START_2', payload: accessToken });
          }
        })
        .catch((err) => console.log(err));
    } else {
      const token = localStorage.getItem('refreshToken');
      if (token) {
        api.postRefreshToken(token)
          .then((res) => {
            if (res.success) {
              const authToken = res.accessToken.split('Bearer ')[1];
              const { refreshToken } = res;
              if (authToken) {
                setCookie('accessToken', authToken, { path: '/', expires: 1200 });
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setIsLoggedIn(true));
                dispatch(setEmailProfileValue(res.user.email));
                dispatch(setNameProfileValue(res.user.name));
                dispatch({ type: 'WS_CONNECTION_START_2', payload: authToken });
              }
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  useEffect(() => {
    if (isResetPasswordActive) {
      history.push('/reset-password');
      dispatch(setIsResetPasswordActive(false));
    }
  }, [isResetPasswordActive, history]);

  useEffect(() => {
    dispatch(getIngredients());
    history.replace(location.pathname, { background: false });
  }, []);

  useEffect(() => {
    if (data.length > 0 && match && match.isExact) {
      const { params } = match;
      const id = (params as any)?.id;
      dispatch(setDataBurgerIngredient(id));
    }

    if (data && data.length > 0) {
      dispatch({ type: 'WS_CONNECTION_START' });
    }
  }, [data]);

  useEffect(() => {
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword1 />
        </Route>
        <Route path="/reset-password">
          <ForgotPassword2 />
        </Route>
        <ProtectedRoute
          component={ProfilePage}
          exact
          path="/profile/orders/:id"
          pathToRedirect={{
            pathname: '/login',
            state: { profile: true },
          }}
        />
        <ProtectedRoute
          component={ProfilePage}
          exact
          path="/profile/orders"
          pathToRedirect={{
            pathname: '/login',
            state: { profile: true },
          }}
        />
        <ProtectedRoute
          component={ProfilePage}
          exact
          path="/profile"
          pathToRedirect={{
            pathname: '/login',
            state: { profile: true },
          }}
        />
        <Route exact path="/feed">
          <OrderTapePage />
        </Route>
        <Route exact path="/feed/:id">
          <OrderTapePage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
