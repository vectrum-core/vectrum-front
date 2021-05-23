import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import storage from "redux-persist/lib/storage";
//import localforage from "localforage";
import createEnhancers, { sagaMiddleware } from "./enhancers";
import createRootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createApi from "../api";
import { options, apiOptions } from "../constants";
import * as A from "./actions";
import * as S from "./selectors";



const persistConfig = {
  key: "store",
  storage,
  whitelist: [],
  stateReconciler: autoMergeLevel1,
};

export let api;


const initialState = {};

export const configureStore = (preloadedState = {}) => {
  const store = createStore(
    persistReducer(persistConfig, createRootReducer()),
    Object.assign({}, initialState, preloadedState),
    createEnhancers(),
  );
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./rootReducer", () => {
      store.replaceReducer(persistReducer(persistConfig, createRootReducer()));
    });
  }

  const getAuthCredentials = () => S.profile.getAuthCredentials(store.getState());
  const reauthenticate = () => store.dispatch(A.profile.reAuthenticate());
  api = createApi({
    ...apiOptions,
    dispatch: store.dispatch,
    getAuthCredentials,
    reauthenticate,
  });
  sagaMiddleware.run(rootSaga, { api, options });

  return { store, persistor };
}

export default configureStore;
