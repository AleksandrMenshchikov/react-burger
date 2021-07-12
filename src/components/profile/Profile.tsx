import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
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

function Profile() {
  const {
    name, email, password, isValidForm, isLoading,
  } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [sign, setSign] = useState(0);
  const formRef = useRef(null);
  const errorRef = useRef(null);

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

  useEffect(() => {
    if (location.pathname === '/profile/logout') {
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
  }, [location]);

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

  return (
    <div className={styles.profile}>
      <div className={styles.navContainer}>
        <nav>
          <ul className={styles.nav__list}>
            <NavLink to="/profile" exact className={`${styles.nav__item} text text_type_main-medium text_color_inactive`} activeClassName={styles.nav__item_active}>Профиль</NavLink>
            <NavLink to="/profile/orders" className={`${styles.nav__item} text text_type_main-medium text_color_inactive`} activeClassName={styles.nav__item_active}>История заказов</NavLink>
            <NavLink to="/profile/logout" className={`${styles.nav__item} text text_type_main-medium text_color_inactive`} activeClassName={styles.nav__item_active}>Выход</NavLink>
          </ul>
        </nav>
        <p className={`${styles.nav__text} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={handleFormSubmit} ref={formRef}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleNameChange}
          value={name}
          icon="EditIcon"
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <EmailInput onChange={handleEmailChange} value={email} name="email" />
        <p ref={errorRef} className={`${styles.error} text_type_main-default`}>Пользователь с таким email уже существует, укажите другой</p>
        <PasswordInput onChange={handlePasswordChange} value={password} name="password" />
        <div className={styles.buttonContainer}>
          <Button type="primary" size="medium">{isLoading ? 'Загрузка данных' : 'Сохранить'}</Button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Profile);
