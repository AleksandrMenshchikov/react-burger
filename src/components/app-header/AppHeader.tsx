import React, { useEffect } from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './AppHeader.module.css';

function AppHeader() {
  const location = useLocation();
  const [state, setState] = React.useState({
    isConstructorLinkHover: false,
    isConstructorLinkActive: false,
    isOrderLinkHover: false,
    isOrderLinkActive: false,
    isProfileLinkHover: false,
    isProfileLinkActive: false,
  });

  useEffect(() => {
    const splitPath = location.pathname.split('/');
    if (splitPath.includes('feed')) {
      setState(() => ({
        ...state,
        isOrderLinkActive: true,
      }));
    } else if ((splitPath.includes('profile'))) {
      setState(() => ({
        ...state,
        isProfileLinkActive: true,
      }));
    } else {
      setState(() => ({
        ...state,
        isConstructorLinkActive: true,
      }));
    }
  }, []);

  function handleConstructorLinkMouseOver() {
    setState({
      ...state,
      isConstructorLinkHover: true,
    });
  }

  function handleConstructorLinkMouseLeave() {
    setState({
      ...state,
      isConstructorLinkHover: false,
    });
  }

  function handleConstructorLinkClick() {
    setState({
      ...state,
      isConstructorLinkActive: true,
      isOrderLinkActive: false,
      isProfileLinkActive: false,
    });
  }

  function handleOrderLinkMouseOver() {
    setState({
      ...state,
      isOrderLinkHover: true,
    });
  }

  function handleOrderLinkMouseLeave() {
    setState({
      ...state,
      isOrderLinkHover: false,
    });
  }

  function handleOrderLinkClick() {
    setState({
      ...state,
      isOrderLinkActive: true,
      isConstructorLinkActive: false,
      isProfileLinkActive: false,
    });
  }

  function handleLogoLinkClick() {
    setState({
      ...state,
      isOrderLinkActive: false,
      isConstructorLinkActive: true,
      isProfileLinkActive: false,
    });
  }

  function handleProfileLinkMouseOver() {
    setState({
      ...state,
      isProfileLinkHover: true,
    });
  }

  function handleProfileLinkMouseLeave() {
    setState({
      ...state,
      isProfileLinkHover: false,
    });
  }

  function handleProfileLinkClick() {
    setState({
      ...state,
      isOrderLinkActive: false,
      isConstructorLinkActive: false,
      isProfileLinkActive: true,
    });
  }

  let isConstructorLinkActive;
  let isOrderLinkActive;
  let isProfileLinkActive;

  if (state.isConstructorLinkActive || state.isConstructorLinkHover) {
    isConstructorLinkActive = true;
  } else {
    isConstructorLinkActive = false;
  }

  if (state.isOrderLinkActive || state.isOrderLinkHover) {
    isOrderLinkActive = true;
  } else {
    isOrderLinkActive = false;
  }

  if (state.isProfileLinkActive || state.isProfileLinkHover) {
    isProfileLinkActive = true;
  } else {
    isProfileLinkActive = false;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink
              to="/"
              className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}
              onMouseOver={handleConstructorLinkMouseOver}
              onMouseLeave={handleConstructorLinkMouseLeave}
              onClick={handleConstructorLinkClick}
            >
              {isConstructorLinkActive ? (
                <BurgerIcon type="primary" />
              ) : (
                <BurgerIcon type="secondary" />
              )}
              <p
                className={`pl-2 text text_type_main-default ${
                  isConstructorLinkActive
                    ? styles.text_color_active
                    : 'text_color_inactive'
                }`}
              >
                ??????????????????????
              </p>
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink
              to="/feed"
              className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}
              onMouseOver={handleOrderLinkMouseOver}
              onMouseLeave={handleOrderLinkMouseLeave}
              onClick={handleOrderLinkClick}
            >
              {isOrderLinkActive ? (
                <ListIcon type="primary" />
              ) : (
                <ListIcon type="secondary" />
              )}
              <p
                className={`pl-2 text text_type_main-default ${
                  isOrderLinkActive
                    ? styles.text_color_active
                    : 'text_color_inactive'
                }`}
              >
                ?????????? ??????????????
              </p>
            </NavLink>
          </li>
          <li className={`${styles.listItem} ${styles.listItem_logo}`}>
            <NavLink
              to="/"
              className={`${styles.navLink} ${styles.navLink_logo}`}
              onClick={handleLogoLinkClick}
            >
              <div className={`${styles.logo} pl-5 pr-5`} />
            </NavLink>
          </li>
          <li className={`${styles.listItem} ${styles.listItem_profile}`}>
            <NavLink
              to={{
                pathname: '/profile',
              }}
              className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}
              onMouseOver={handleProfileLinkMouseOver}
              onMouseLeave={handleProfileLinkMouseLeave}
              onClick={handleProfileLinkClick}
            >
              {isProfileLinkActive ? (
                <ProfileIcon type="primary" />
              ) : (
                <ProfileIcon type="secondary" />
              )}
              <p
                className={`pl-2 text text_type_main-default ${
                  isProfileLinkActive
                    ? styles.text_color_active
                    : 'text_color_inactive'
                }`}
              >
                ???????????? ??????????????
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default React.memo(AppHeader);
