import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Route, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import styles from './OrderTape.module.css';
import stone from '../../images/stone.svg';
import { RootState } from '../../services/reducers';
import Preload from '../preload/Preload';
import { setIsModalOverlayOpened, setNameComponentActive } from '../../services/actions/modalOverlay';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import Modal from '../modal/Modal';
import { setDataOrdersTapeDetails } from '../../services/actions/ordersTape';
import OrderTapeDetails from '../order-tape-details/OrderTapeDetails';

function OrderTape() {
  const { nameComponentActive } = useSelector((state: RootState) => state.modalOverlay);
  const { messages } = useSelector((state: RootState) => state.ws);
  const data = messages[messages.length - 1];
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch('/feed/:id');

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
    history.push(`/feed/${id}`, { background: true });
  }

  if (messages && messages.length === 0) {
    return <Preload />;
  }

  if (!background && match && match.isExact && data) {
    return (
      <Route path="/feed/:id">
        <div style={{ marginTop: '180px' }}>
          <OrderTapeDetails />
        </div>
      </Route>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className="mt-10 mb-5 text text_type_main-large">
            Лента заказов
          </h2>
          <div className={styles.innerContainer}>
            <ul className={styles.list}>
              {data && data.orders.map((order) => (
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
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statsTop}>
            <div>
              <p className="text text_type_main-medium">Готовы:</p>
              <div className={styles.statsTopNumbers}>
                {data && data.orders.map((order) => (
                  order.status === 'done'
                    ? <span key={order._id} className={`${styles.statsTopLeftNumbersItem} text text_type_digits-default`}>{order.number}</span>
                    : null
                ))}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">В работе:</p>
              <div className={styles.statsTopNumbers}>
                {data && data.orders.map((order) => (
                  order.status !== 'done'
                    ? <span className={`${styles.statsTopRightNumbersItem} text text_type_digits-default`}>{order.number}</span>
                    : null
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <span className="text text_type_digits-large">{new Intl.NumberFormat('ru').format(data.total - 1)}</span>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className="text text_type_digits-large">{new Intl.NumberFormat('ru').format(data.totalToday)}</span>
          </div>
        </div>
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

export default React.memo(OrderTape);
