// questo file si occuperà di creare il Redux Store all'avvio dell'applicazione

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { encryptTransform } from "redux-persist-transform-encrypt";
// import mainReducer from "../reducers";
import cartReducer from "../reducers/cartReducer";
import userReducer from "../reducers/userReducer";
import adminReducer from "../reducers/adminReducer";
import bookSelectedReducer from "../reducers/bookSelectedReducer";
import booksReducer from "../reducers/booksReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY
    })
  ]
};

// i singoli reducers vengono combinati in un unico oggetto grazie alla funzione combineReducers PRIMA di essere forniti allo store (che vorrebbe un singolo reducer)
// combiniamo le singole porzioni di stato ("slices") in un unico macro oggetto completo prima di fornirlo allo store
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  admin: adminReducer,
  books: booksReducer,
  bookSelected: bookSelectedReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);
