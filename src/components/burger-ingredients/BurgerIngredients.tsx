import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../utils/appContext';
import styles from './BurgerIngredients.module.css';

function BurgerIngredients({ onBurgerIngredientsClick }: any) {
  const data = React.useContext(DataContext);
  const tabContainerRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const bunsRef = React.useRef(null);
  const saucesRef = React.useRef(null);
  const mainsRef = React.useRef(null);
  const [current, setCurrent] = React.useState('Булки');
  const [flagOfTabClick, setFlagOfTabClick] = React.useState(false);
  const [text, setText] = React.useState('Булки');
  const [tabContainerBottomCoordinate, setTabContainerBottomCoordinate] = React.useState(0);
  const [bunsTopCoordinate, setBunsTopCoordinate] = React.useState(0);
  const [saucesTopCoordinate, setSaucesTopCoordinate] = React.useState(0);
  const [mainsTopCoordinate, setMainsTopCoordinate] = React.useState(0);

  function handleTabClick(e) {
    const textElem = e.target.closest('div').children[0].textContent;
    setText(textElem);
    setFlagOfTabClick(!flagOfTabClick);
  }

  useEffect(() => {
    const tabContainerBottom = tabContainerRef.current
      .getBoundingClientRect().bottom;
    setTabContainerBottomCoordinate(tabContainerBottom);

    const bunsTop = bunsRef.current
      .getBoundingClientRect().top;
    setBunsTopCoordinate(bunsTop);

    const saucesTop = saucesRef.current
      .getBoundingClientRect().top;
    setSaucesTopCoordinate(saucesTop);

    const mainsTop = mainsRef.current
      .getBoundingClientRect().top;
    setMainsTopCoordinate(mainsTop);
  }, []);

  useEffect(() => {
    if (text === 'Булки') {
      containerRef.current.scrollTo(0, bunsTopCoordinate - tabContainerBottomCoordinate);
    } else if (text === 'Соусы') {
      containerRef.current.scrollTo(0, saucesTopCoordinate - tabContainerBottomCoordinate);
    } else if (text === 'Начинки') {
      containerRef.current.scrollTo(0, mainsTopCoordinate - tabContainerBottomCoordinate);
    }
  }, [flagOfTabClick, bunsTopCoordinate, tabContainerBottomCoordinate,
    saucesTopCoordinate, mainsTopCoordinate, text]);

  return (
    <div>
      <div>
        <h2 className="mt-10 mb-5 text text_type_main-large">
          Соберите бургер
        </h2>
        <div ref={tabContainerRef} className={styles.tabContainer}>
          <div onClick={handleTabClick} role="button" tabIndex={0} onKeyDown={handleTabClick}>
            <Tab
              value="Булки"
              active={current === 'Булки'}
              onClick={setCurrent}
            >
              Булки
            </Tab>
          </div>
          <div onClick={handleTabClick} role="button" tabIndex={0} onKeyDown={handleTabClick}>
            <Tab
              value="Соусы"
              active={current === 'Соусы'}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </div>
          <div onClick={handleTabClick} role="button" tabIndex={0} onKeyDown={handleTabClick}>
            {' '}
            <Tab
              value="Начинки"
              active={current === 'Начинки'}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </div>
        </div>
      </div>
      <div ref={containerRef} className={`${styles.container} "mt-10 mb-10"`}>
        {!!data.length
          && data.some((item: any) => item.type === 'bun') && (
            <h3
              ref={bunsRef}
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Булки
            </h3>
        )}
        <ul className={styles.list}>
          {!!data.length
            && data.some((item: any) => item.type === 'bun')
            && data.map((item: any) => {
              if (item.type === 'bun') {
                return (
                  <li className={styles.listItem} id={item._id} key={item._id}>
                    <div
                      className={styles.burgerIngredients}
                      onClick={onBurgerIngredientsClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото булки"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat('ru').format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                  </li>
                );
              }
              return null;
            })}
        </ul>
        {!!data.length
          && data.some((item: any) => item.type === 'sauce') && (
            <h3
              ref={saucesRef}
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Соусы
            </h3>
        )}
        <ul className={styles.list}>
          {!!data.length
            && data.some((item: any) => item.type === 'sauce')
            && data.map((item: any) => {
              if (item.type === 'sauce') {
                return (
                  <li className={styles.listItem} id={item._id} key={item._id}>
                    <div
                      className={styles.burgerIngredients}
                      onClick={onBurgerIngredientsClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото соуса"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat('ru').format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                  </li>
                );
              }
              return null;
            })}
        </ul>
        {!!data.length
          && data.some((item: any) => item.type === 'main') && (
            <h3
              ref={mainsRef}
              className={`${styles.title} "text text_type_main-medium mb-6"`}
            >
              Начинки
            </h3>
        )}
        <ul className={styles.list}>
          {!!data.length
            && data.some((item: any) => item.type === 'main')
            && data.map((item: any) => {
              if (item.type === 'main') {
                return (
                  <li className={styles.listItem} id={item._id} key={item._id}>
                    <div
                      className={styles.burgerIngredients}
                      onClick={onBurgerIngredientsClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={onBurgerIngredientsClick}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image}
                        alt="Фото начинки"
                        className="pl-4 pr-4"
                      />
                      <div className={`${styles.price} pt-1 pb-1`}>
                        <span className="text text_type_digits-default pr-2">
                          {new Intl.NumberFormat('ru').format(item.price)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                      <h5
                        className={`${styles.listItem__text} text text_type_main-default`}
                      >
                        {item.name}
                      </h5>
                    </div>
                  </li>
                );
              }
              return null;
            })}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  onBurgerIngredientsClick: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredients);
