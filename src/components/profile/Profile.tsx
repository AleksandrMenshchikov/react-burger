import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import {
  NavLink, Route, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.css';
import {
  setNameProfileValue, setEmailProfileValue, setPasswordProfileValue, setIsValidFormProfile,
  setIsLoadingProfile,
} from '../../services/actions/profile';
import { RootState } from '../../services/reducers';
import { api } from '../../utils/api';
import { deleteCookie, getCookie } from '../../utils/cookies';
import { setIsLoggedIn } from '../../services/actions/app';
import ProfileOrders from '../profile-orders/ProfileOrders';
import OrderTapeDetails from '../order-tape-details/OrderTapeDetails';
import Preload from '../preload/Preload';
import { setDataOrdersTapeDetails } from '../../services/actions/ordersTape';

function Profile() {
  const { messages } = useSelector((state: RootState) => state.ws2);
  const data = messages[messages.length - 1];
  const {
    name, email, password, isValidForm, isLoading,
  } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [sign, setSign] = useState(0);
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const match = useRouteMatch('/profile/orders');
  const match2 = useRouteMatch('/profile/orders/:id');

  const { state } = location;
  const background = (state as any)?.background;

  useEffect(() => {
    if (!background && match2 && match2.isExact && data) {
      const { params } = match2;
      const id = (params as any)?.id;
      dispatch(setDataOrdersTapeDetails(data.orders
        .filter((item) => item._id === id)));
    }
  }, [data]);

  useEffect(() => {
    if (sign > 0) {
      const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
      const listValidForm = [];
      listInputElements.forEach((item) => {
        if (!item.parentNode.classList.contains('input_status_error') && name && email) {
          listValidForm.push(true);
        } else {
          listValidForm.push(false);
        }
      });
      if (listValidForm.every((item) => item === true)) {
        dispatch(setIsValidFormProfile(true));
      } else {
        dispatch(setIsValidFormProfile(false));
      }
      setSign((prevValue) => prevValue - 1);
    }
  }, [sign]);

  useEffect(() => {
    if (isValidForm && name) {
      dispatch(setIsLoadingProfile(true));
      api.pathUser(
        getCookie('accessToken'),
        name,
        email,
        password,
      )
        .then((res) => {
          if (res.success) {
            errorRef.current.classList.remove(styles.error_active);
            dispatch(setNameProfileValue(res.user.name));
            dispatch(setEmailProfileValue(res.user.email));
          } else {
            errorRef.current.classList.add(styles.error_active);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsValidFormProfile(false));
          dispatch(setIsLoadingProfile(false));
        });
    }
  }, [isValidForm]);

  function handleButtonClick() {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      api.postLogout(token)
        .then((res) => {
          if (res.success) {
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setIsLoggedIn(false));
            dispatch(setEmailProfileValue(''));
            dispatch(setNameProfileValue(''));
            history.push('/login');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleNameChange(e) {
    dispatch(setNameProfileValue(e.target.value));
  }

  function handleEmailChange(e) {
    dispatch(setEmailProfileValue(e.target.value));
  }

  function handlePasswordChange(e) {
    dispatch(setPasswordProfileValue(e.target.value));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    listInputElements.forEach((item) => item.blur());
    setSign((prevValue) => prevValue + 1);
  }

  if (messages && messages.length === 0 && match2 && match2.isExact) {
    return (
      <Preload />
    );
  }

  if (!background && match2 && match2.isExact && data) {
    return (
      <Route path="/profile/orders/:id">
        <div style={{ marginTop: '180px' }}>
          <OrderTapeDetails />
        </div>
      </Route>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.navContainer}>
        <nav>
          <ul className={styles.nav__list}>
            <NavLink to="/profile" exact className={`${styles.nav__item} text text_type_main-medium text_color_inactive`} activeClassName={styles.nav__item_active}>??????????????</NavLink>
            <NavLink to="/profile/orders" className={`${styles.nav__item} text text_type_main-medium text_color_inactive`} activeClassName={styles.nav__item_active}>?????????????? ??????????????</NavLink>
            <button onClick={handleButtonClick} type="button" className={`${styles.button} text text_type_main-medium text_color_inactive`}>??????????</button>
          </ul>
        </nav>
        <p className={`${styles.nav__text} text text_type_main-default text_color_inactive`}>
          ?? ???????? ?????????????? ???? ????????????
          ???????????????? ???????? ???????????????????????? ????????????
        </p>
      </div>
      {(match && match.isExact) || (match2 && match2.isExact) ? <ProfileOrders /> : (
        <form className={styles.form} onSubmit={handleFormSubmit} ref={formRef}>
          <Input
            type="text"
            placeholder="??????"
            onChange={handleNameChange}
            value={name}
            icon="EditIcon"
            name="name"
            error={false}
            errorText="????????????"
            size="default"
          />
          <EmailInput onChange={handleEmailChange} value={email} name="email" />
          <p ref={errorRef} className={`${styles.error} text_type_main-default`}>???????????????????????? ?? ?????????? email ?????? ????????????????????, ?????????????? ????????????</p>
          <PasswordInput onChange={handlePasswordChange} value={password} name="password" />
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium">{isLoading ? '???????????????? ????????????' : '??????????????????'}</Button>
          </div>
        </form>
      )}

    </div>
  );
}

export default React.memo(Profile);
