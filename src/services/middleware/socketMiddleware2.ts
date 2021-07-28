import {
  WS_CONNECTION_START_2,
  WS_SEND_MESSAGE_2,
  WS_CONNECTION_CLOSED_2,
  WS_CONNECTION_SUCCESS_2,
  WS_CONNECTION_ERROR_2,
  WS_GET_MESSAGE_2,
} from '../constants/actionTypes';

export const socketMiddleware2 = (wsUrl) => (store) => {
  let socket2 = null;

  return (next) => (action) => {
    const { dispatch, getState } = store;
    const { type, payload } = action;

    if (type === WS_CONNECTION_START_2) {
      // объект класса WebSocket
      socket2 = new WebSocket(`${wsUrl}?token=${payload}`);
    }
    if (socket2) {
      // функция, которая вызывается при открытии сокета
      socket2.onopen = (event) => {
        dispatch({ type: WS_CONNECTION_SUCCESS_2, payload: event });
      };

      // функция, которая вызывается при ошибке соединения
      socket2.onerror = (event) => {
        dispatch({ type: WS_CONNECTION_ERROR_2, payload: event });
      };

      // функция, которая вызывается при получения события от сервера
      socket2.onmessage = (event) => {
        const { data } = event;
        dispatch({
          type: WS_GET_MESSAGE_2,
          payload: { data, dataIngredients: getState().ingredients.data },
        });
      };
      // функция, которая вызывается при закрытии соединения
      socket2.onclose = (event) => {
        dispatch({ type: WS_CONNECTION_CLOSED_2, payload: event });
      };

      if (type === WS_SEND_MESSAGE_2) {
        const message = payload;
        // функция для отправки сообщения на сервер
        socket2.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
