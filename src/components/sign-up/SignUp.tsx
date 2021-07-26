import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../services/reducers';
import { setCookie } from '../../utils/cookies';
import {
  setNameRegisterValue, setEmailRegisterValue, setPasswordRegisterValue, setIsValidRegisterForm,
} from '../../services/actions/signUp';
import styles from './SignUp.module.css';
import { api } from '../../utils/api';

function SignUp() {
  const { isLoggedIn } = useSelector((state: RootState) => state.app);
  const {
    nameValue,
    emailValue,
    passwordValue,
    isValidForm,
  } = useSelector((state: RootState) => state.signUp);
  const dispatch = useDispatch();
  const [sign, setSign] = useState(0);
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    const listValidForm = [];
    listInputElements.forEach((item) => {
      if (!item.parentNode.classList.contains('input_status_error') && nameValue && emailValue && passwordValue) {
        listValidForm.push(true);
      } else {
        listValidForm.push(false);
      }
    });
    if (listValidForm.every((item) => item === true)) {
      dispatch(setIsValidRegisterForm(true));
    } else {
      dispatch(setIsValidRegisterForm(false));
    }

    const name = nameValue;
    const email = emailValue;
    const password = passwordValue;
    if (isValidForm && name) {
      api.postRegister(
        name,
        email,
        password,
      )
        .then((res) => {
          if (res.success) {
            errorRef.current.classList.remove(styles.error_active);
            const authToken = res.accessToken.split('Bearer ')[1];
            const { refreshToken } = res;
            if (authToken) {
              setCookie('accessToken', authToken, { path: '/', expires: 1200 });
              localStorage.setItem('refreshToken', refreshToken);
              history.push('/login');
            }
          } else {
            errorRef.current.classList.add(styles.error_active);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isValidForm, sign]);

  function handleSubmitForm(e) {
    e.preventDefault();
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    listInputElements.forEach((item) => item.blur());
    setSign((prevValue) => prevValue + 1);
  }

  function handleNameInput(e) {
    dispatch(setNameRegisterValue(e.target.value));
  }

  function handleEmailInput(e) {
    dispatch(setEmailRegisterValue(e.target.value));
  }

  function handlePasswordInput(e) {
    dispatch(setPasswordRegisterValue(e.target.value));
  }

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.signIn}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
      <form className={styles.form} noValidate ref={formRef} onSubmit={handleSubmitForm}>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleNameInput}
            value={nameValue}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
          />
          <EmailInput onChange={handleEmailInput} value={emailValue} name="email" size="default" />
          <p ref={errorRef} className={`${styles.error} text_type_main-default`}>Пользователь с таким email уже существует, укажите другой</p>
          <PasswordInput onChange={handlePasswordInput} value={passwordValue} name="password" size="default" />
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium">Зарегистрироваться</Button>
          </div>
        </div>
      </form>
      <div className={styles.linkContainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Уже зарегистрированы?</p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>Войти</Link>
      </div>
    </div>
  );
}

export default React.memo(SignUp);
