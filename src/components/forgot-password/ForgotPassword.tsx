import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../services/reducers';
import { setEmailForgotPassword1Value, setIsValidForgotPassword1Form, postEmailForgotPassword1 } from '../../services/actions/forgotPassword1';
import { setIsResetPasswordActive } from '../../services/actions/app';
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const { emailValue, isValidForm } = useSelector((state: RootState) => state.forgotPassword1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!emailValue) {
      dispatch(setIsValidForgotPassword1Form(false));
    }
    if (isError) {
      setErrorMessage(inputRef.current.validationMessage);
    } else {
      setErrorMessage('');
    }
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regExp.test(emailValue)) {
      dispatch(setIsValidForgotPassword1Form(true));
      setIsError(false);
      setErrorMessage('');
    } else {
      dispatch(setIsValidForgotPassword1Form(false));
    }
  }, [emailValue, isError, dispatch]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!isValidForm) {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(postEmailForgotPassword1(emailValue));
      dispatch(setEmailForgotPassword1Value(''));
    }
  }

  function handleEmailInput(e) {
    dispatch(setEmailForgotPassword1Value(e.target.value));
  }

  return (
    <div className={styles.signIn}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
      <form className={styles.form} noValidate onSubmit={handleSubmitForm}>
        <div className={styles.inputContainer}>
          <Input
            ref={inputRef}
            type="email"
            placeholder="Укажите e-mail"
            onChange={handleEmailInput}
            value={emailValue}
            name="email"
            error={isError}
            errorText={errorMessage}
            size="default"
          />
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium">Восстановить</Button>
          </div>
        </div>
      </form>
      <div className={styles.linkContainer}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>Войти</Link>
      </div>
    </div>
  );
}

export default React.memo(ForgotPassword);
