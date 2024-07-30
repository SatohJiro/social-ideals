import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "service"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
