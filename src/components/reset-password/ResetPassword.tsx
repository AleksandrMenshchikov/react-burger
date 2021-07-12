import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../services/reducers';
import {
  setCodeForgotPassword2Value, setPasswordForgotPassword2Value, setIsValidForgotPassword2Form,
} from '../../services/actions/forgotPassword2';
import styles from './ResetPassword.module.css';
import { api } from '../../utils/api';

function ResetPassword() {
  const {
    passwordValue,
    codeValue,
    isValidForm,
  } = useSelector((state: RootState) => state.forgotPassword2);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [sign, setSign] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    const listValidForm = [];
    listInputElements.forEach((item) => {
      if (!item.parentNode.classList.contains('input_status_error') && codeValue && passwordValue) {
        listValidForm.push(true);
      } else {
        listValidForm.push(false);
      }
    });
    if (listValidForm.every((item) => item === true)) {
      dispatch(setIsValidForgotPassword2Form(true));
    } else {
      dispatch(setIsValidForgotPassword2Form(false));
    }
  }, [sign]);

  useEffect(() => {
    if (isValidForm) {
      const password = passwordValue;
      const token = codeValue;
      api.postResetPassword(password, token).then((res) => {
        if (res.success) {
          history.push('/login');
          setIsError(false);
          setErrorMessage('');
          dispatch(setCodeForgotPassword2Value(''));
          dispatch(setPasswordForgotPassword2Value(''));
          dispatch(setIsValidForgotPassword2Form(false));
        } else {
          setIsError(true);
          setErrorMessage('Неверно введен код для восстановления пароля');
        }
      });
    }
  }, [isValidForm]);

  function handleSubmitForm(e) {
    e.preventDefault();
    const listInputElements = [...formRef.current.elements].filter((item) => item.tagName === 'INPUT');
    listInputElements.forEach((item) => item.blur());
    setSign((prevValue) => prevValue + 1);
    setIsError(false);
    dispatch(setIsValidForgotPassword2Form(false));
  }

  function handleCodeInput(e) {
    dispatch(setCodeForgotPassword2Value(e.target.value));
  }

  function handlePasswordInput(e) {
    dispatch(setPasswordForgotPassword2Value(e.target.value));
  }

  return (
    <div className={styles.signIn}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
      <form className={styles.form} noValidate ref={formRef} onSubmit={handleSubmitForm}>
        <div className={styles.inputContainer}>
          <PasswordInput onChange={handlePasswordInput} value={passwordValue} name="password" size="default" />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={handleCodeInput}
            value={codeValue}
            name="name"
            error={isError}
            errorText={errorMessage}
            size="default"
          />
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium">Сохранить</Button>
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

export default React.memo(ResetPassword);
