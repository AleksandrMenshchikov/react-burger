import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import styles from './ProfileOrders.module.css';
import stone from '../../images/stone.svg';
import { RootState } from '../../services/reducers';
import spinWhite from '../../images/spin-white.svg';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { setIsModalOverlayOpened, setNameComponentActive } from '../../services/actions/modalOverlay';
import Modal from '../modal/Modal';
import OrderTapeDetails from '../order-tape-details/OrderTapeDetails';
import { setDataOrdersTapeDetails } from '../../services/actions/ordersTape';

function ProfileOrders() {
  const { nameComponentActive } = useSelector((state: RootState) => state.modalOverlay);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { messages } = useSelector((state: RootState) => state.ws2);
  const { error } = useSelector((state: RootState) => state.ws2);
  const data = messages[messages.length - 1];
  const match = useRouteMatch('/profile/orders/:id');

  const { state } = location;
  const background = (state as any)?.background;

  useEffect(() => {
    if (!background && match && match.isExact && data) {
      const { params } = match;
      const id = (params as any)?.id;
      dispatch(setDataOrdersTapeDetails(data.orders
        .filter((item) => item._id === id)));
    }
  }, [data]);

  function handleLiClick(e) {
    const { id } = e.currentTarget.dataset;
    dispatch(setIsModalOverlayOpened(true));
    dispatch(setNameComponentActive('OrderTape'));
    dispatch(setDataOrdersTapeDetails(data.orders.filter((item) => item._id === id)));
    history.push(`/profile/orders/${id}`, { background: true });
  }

  if (messages && messages.length === 0) {
    return (
      <div
        className={styles.container}
      >
        {error ? (
          <h1 className="text text_type_main-large">
            Ошибка на сервере. Попробуйте зайти на сайт чуть позже.
          </h1>
        ) : (
          <img src={spinWhite} alt="Загрузка данных" />
        )}
      </div>
    );
  }
  return (
    <>
      <div className={styles.innerContainer}>
        <ul className={styles.list}>
          {data && data.orders.sort((a, b) => b.number - a.number).map((order) => (
            <button
              type="button"
              className={styles.listItem}
              data-id={order._id}
              key={order._id}
              onClick={handleLiClick}
            >
              <div className={styles.listItemTop}>
                <span className="text text_type_digits-default">
                  #
                  {order.number}
                </span>
                <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
              </div>
              <p className={`${styles.listItemCenter} text text_type_main-medium`}>{order.name}</p>
              {order.status === 'done'
                ? <span className={`${styles.done} text text_type_main-default`}>Выполнен</span>
                : <span className={`${styles.make} text text_typetext_type_main-default`}>Готовится</span>}

              <div className={styles.listItemBottom}>
                <div className={styles.listItemImages}>
                  {order.ingredients.map((item, index) => (
                    <div
                      className={styles.listItemImageContainer}
                      key={uuidv4()}
                      style={{ zIndex: 10000 - index }}
                    >
                      <img className={styles.listItemImage} src={item.image_mobile} alt="Фото ингредиента" />
                    </div>
                  ))}
                </div>
                <div className={styles.listItemPrice}>
                  <span className="text text_type_digits-default">{order.totalPrice}</span>
                  <img src={stone} alt="Камень" />
                </div>
              </div>
            </button>
          ))}
        </ul>
      </div>

      <ModalOverlay>
        {nameComponentActive === 'OrderTape' ? (
          <Modal title="">
            <OrderTapeDetails />
          </Modal>
        ) : null}
      </ModalOverlay>
    </>
  );
}

export default React.memo(ProfileOrders);
