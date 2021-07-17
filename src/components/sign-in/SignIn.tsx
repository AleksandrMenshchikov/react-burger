import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../services/reducers';
import styles from './SignIn.module.css';
import { setEmailValue, setPasswordValue, setIsValidForm } from '../../services/actions/signIn';
import { api } from '../../utils/api';
import { setCookie } from '../../utils/cookies';
import { setIsLoggedIn } from '../../services/actions/app';
import { setEmailProfileValue, setNameProfileValue } from '../../services/actions/profile';

function SignIn() {
  const {
    emailValue,
    passwordValue,
    isValidForm,
  } = useSelector((state: RootState) => state.signIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [sign, setSign] = useState(0);
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    const listValidForm = [];
    listInputElements.forEach((item) => {
      if (!item.parentNode.classList.contains('input_status_error') && emailValue && passwordValue) {
        listValidForm.push(true);
      } else {
        listValidForm.push(false);
      }
    });
    if (listValidForm.every((item) => item === true)) {
      dispatch(setIsValidForm(true));
    } else {
      dispatch(setIsValidForm(false));
    }
  }, [sign]);

  useEffect(() => {
    if (isValidForm) {
      const email = emailValue;
      const password = passwordValue;
      api.postLogin(email, password)
        .then((res) => {
          if (res.success) {
            errorRef.current.classList.remove(styles.error_active);
            const authToken = res.accessToken.split('Bearer ')[1];
            const { refreshToken } = res;
            if (authToken) {
              const { state } = location;
              const order = (state as any)?.order;
              const profile = (state as any)?.profile;
              if (order) {
                history.goBack();
              } else if (profile) {
                history.push('/profile');
              } else {
                history.push('/');
              }
              setCookie('accessToken', authToken, { expires: 1200 });
              localStorage.setItem('refreshToken', refreshToken);
              dispatch(setIsLoggedIn(true));
              dispatch(setEmailProfileValue(res.user.email));
              dispatch(setNameProfileValue(res.user.name));
              dispatch(setEmailValue(''));
              dispatch(setPasswordValue(''));
            }
          } else {
            errorRef.current.classList.add(styles.error_active);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(setIsValidForm(false)));
    }
  }, [isValidForm]);

  function handleSubmitForm(e) {
    e.preventDefault();
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    listInputElements.forEach((item) => item.blur());
    setSign((prevValue) => prevValue + 1);
  }

  function handleEmailInput(e) {
    dispatch(setEmailValue(e.target.value));
  }

  function handlePasswordInput(e) {
    dispatch(setPasswordValue(e.target.value));
  }

  return (
    <div className={styles.signIn}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
      <form ref={formRef} className={styles.form} onSubmit={handleSubmitForm} noValidate>
        <div className={styles.inputContainer}>
          <EmailInput onChange={handleEmailInput} value={emailValue} name="email" size="default" />
          <PasswordInput onChange={handlePasswordInput} value={passwordValue} name="password" size="default" />
          <p ref={errorRef} className={`${styles.error} text_type_main-default`}>Email или пароль введены неверно</p>
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium">Войти</Button>
          </div>
        </div>
      </form>
      <div className={styles.linkContainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вы — новый пользователь?</p>
        <Link to="/register" className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link>
      </div>
      <div className={styles.linkContainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
        <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
      </div>
    </div>
  );
}

export default React.memo(SignIn);
