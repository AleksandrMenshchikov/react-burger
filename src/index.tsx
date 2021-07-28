import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/index';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { socketMiddleware2 } from './services/middleware/socketMiddleware2';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware('wss://norma.nomoreparties.space/orders/all'),
    socketMiddleware2('wss://norma.nomoreparties.space/orders'),
  ),
));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
