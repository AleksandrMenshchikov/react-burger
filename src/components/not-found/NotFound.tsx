import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.NotFoundPage}>
      <div className={styles.NotFoundPage__container}>
        <h1 className="text text_type_main-large">Ошибка 404</h1>
        <p className={`${styles.NotFoundPage__subtitle} text text_type_main-medium`}>Страница не найдена</p>
        <p className={`${styles.NotFoundPage__text} text text_type_main-default`}>
          Неправильно набран адрес или такой страницы не существует
        </p>
        <Link to="/">
          <Button type="primary" size="medium">
            Перейти на главную страницу
          </Button>
        </Link>
      </div>
    </div>
  );
}
