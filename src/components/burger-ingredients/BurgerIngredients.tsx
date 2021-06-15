import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';
import styles from './BurgerIngredients.module.css';
import { RootState } from '../../services/reducers';

function BurgerIngredients() {
  const { data } = useSelector((state: RootState) => state.ingredients);
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
                  <BurgerIngredientsItem
                    item={item}
                    key={item._id}
                  />
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
                  <BurgerIngredientsItem
                    item={item}
                    key={item._id}
                  />
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
                  <BurgerIngredientsItem
                    item={item}
                    key={item._id}
                  />
                );
              }
              return null;
            })}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(BurgerIngredients);
