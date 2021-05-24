import React, { Component } from "react";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

export class AppHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isConstructorLinkHover: false,
      isConstructorLinkActive: true,
      isOrderLinkHover: false,
      isOrderLinkActive: false,
      isProfoleLinkHover: false,
      isProfoleLinkActive: false,
    };
  }

  handleConstructorLinkMouseOver = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isConstructorLinkHover: true,
      };
    });
  };

  handleConstructorLinkMouseLeave = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isConstructorLinkHover: false,
      };
    });
  };

  handleConstructorLinkClick = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isConstructorLinkActive: true,
        isOrderLinkActive: false,
        isProfileLinkActive: false,
      };
    });
  };

  handleOrderLinkMouseOver = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isOrderLinkHover: true,
      };
    });
  };

  handleOrderLinkMouseLeave = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isOrderLinkHover: false,
      };
    });
  };

  handleOrderLinkClick = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isOrderLinkActive: true,
        isConstructorLinkActive: false,
        isProfileLinkActive: false,
      };
    });
  };

  handleLogoLinkClick = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isOrderLinkActive: false,
        isConstructorLinkActive: true,
        isProfileLinkActive: false,
      };
    });
  };

  handleProfileLinkMouseOver = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isProfileLinkHover: true,
      };
    });
  };

  handleProfileLinkMouseLeave = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isProfileLinkHover: false,
      };
    });
  };

  handleProfileLinkClick = () => {
    this.setState((prevState: any) => {
      return {
        ...prevState,
        isOrderLinkActive: false,
        isConstructorLinkActive: false,
        isProfileLinkActive: true,
      };
    });
  };

  render() {
    let isConstructorLinkActive;
    let isOrderLinkActive;
    let isProfileLinkActive;
    if (
      this.state.isConstructorLinkActive ||
      this.state.isConstructorLinkHover
    ) {
      isConstructorLinkActive = true;
    } else {
      isConstructorLinkActive = false;
    }

    if (this.state.isOrderLinkActive || this.state.isOrderLinkHover) {
      isOrderLinkActive = true;
    } else {
      isOrderLinkActive = false;
    }

    if (this.state.isProfileLinkActive || this.state.isProfileLinkHover) {
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
                onMouseOver={this.handleConstructorLinkMouseOver}
                onMouseLeave={this.handleConstructorLinkMouseLeave}
                onClick={this.handleConstructorLinkClick}
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
                      : "text_color_inactive"
                  }`}
                >
                  Конструктор
                </p>
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                to="/"
                className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}
                onMouseOver={this.handleOrderLinkMouseOver}
                onMouseLeave={this.handleOrderLinkMouseLeave}
                onClick={this.handleOrderLinkClick}
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
                      : "text_color_inactive"
                  }`}
                >
                  Лента заказов
                </p>
              </NavLink>
            </li>
            <li className={`${styles.listItem} ${styles.listItem_logo}`}>
              <NavLink
                to="/"
                className={`${styles.navLink} ${styles.navLink_logo}`}
                onClick={this.handleLogoLinkClick}
              >
                <div className={`${styles.logo} pl-5 pr-5`} />
              </NavLink>
            </li>
            <li className={`${styles.listItem} ${styles.listItem_profile}`}>
              <NavLink
                to="/"
                className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}
                onMouseOver={this.handleProfileLinkMouseOver}
                onMouseLeave={this.handleProfileLinkMouseLeave}
                onClick={this.handleProfileLinkClick}
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
                      : "text_color_inactive"
                  }`}
                >
                  Личный кабинет
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
