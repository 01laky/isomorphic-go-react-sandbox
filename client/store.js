import { applyMiddleware, createStore as reduxCreateStore } from "redux";
import reducers from "./reducers";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga'
import sagas from '#app/utils/sagas';

const client = axios.create({
  baseURL:'http://localhost:5001/api',
  responseType: 'json'
});

const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = compose;

// const middlewares = [axiosMiddleware(client), sagaMiddleware];

// Add state logger
// if (process.env.NODE_ENV !== "production") {
//   middlewares.push(require("redux-logger")());
// }

export function createStore(state) {
  const store = reduxCreateStore(
    reducers,
    state,
    applyMiddleware.apply(null, [sagaMiddleware])
    // applyMiddleware([sagaMiddleware()]),
  );
  sagaMiddleware.run(sagas);
  return store;
}



export let store = null;
export function getStore() {
  return store;
}
export function setAsCurrentStore(s) {
  store = s;
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    window.store = store;
  }
}
