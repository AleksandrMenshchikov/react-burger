import {
  WS_CONNECTION_SUCCESS_2,
  WS_CONNECTION_ERROR_2,
  WS_CONNECTION_CLOSED_2,
  WS_GET_MESSAGE_2,
} from '../constants/actionTypes';

function formattedData(response, dataIngredients) {
  return {
    total: response.total,
    totalToday: response.totalToday,
    ...response[response.length - 1],
    orders: response.orders.map((order) => {
      let counter = 0;
      let counter2 = 0;
      return {
        ...order,
        ingredients: order.ingredients
          .map((ingredient) => dataIngredients
            .filter((item) => {
              if (item._id === ingredient) {
                if (item._id === '60d3b41abdacab0026a733c6' || item._id === '60d3b41abdacab0026a733c7') {
                  counter2 += 1;
                  counter += item.price * 2;
                  if (counter2 > 1) {
                    counter -= item.price * 2;
                  }
                } else {
                  counter += item.price;
                }
                return true;
              }
              return false;
            })[0]).reduce((acc, item, index, arr) => {
            let amount = 0;
            arr.forEach((ingredient) => {
              if (ingredient._id === item._id) {
                amount += 1;
              }
            });
            if (!acc.find((elem) => elem._id === item._id)) {
              return [...acc, { ...item, amount }];
            }
            return acc;
          }, []),
        totalPrice: counter,
        createdAt: new Date(order.createdAt).toLocaleString(),
        updatedAt: new Date(order.createdAt).toLocaleString(),
      };
    }),
  };
}

const initialState = {
  wsConnected: false,
  messages: [],
  error: null,
};

// Создадим редьюсер для WebSocket
export const wsReducer2 = (state = initialState, action) => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS_2:
      return {
        ...state,
        error: null,
        wsConnected: true,
      };

      // Опишем обработку экшена с типом WS_CONNECTION_ERROR
      // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR_2:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

      // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
      // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED_2:
      return {
        ...state,
        error: null,
        wsConnected: false,
      };

      // Опишем обработку экшена с типом WS_GET_MESSAGE
      // Обработка происходит, когда с сервера возвращаются данные
      // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE_2:
      return {
        ...state,
        error: null,
        messages: state.messages.length
          ? [...state.messages,
            formattedData(JSON.parse(action.payload.data), action.payload.dataIngredients)]
          : [formattedData(JSON.parse(action.payload.data), action.payload.dataIngredients)],
      };
    default:
      return state;
  }
};
