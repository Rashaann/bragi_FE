import '@/styles/globals.css';
import type { AppProps } from 'next/app'

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import bragi from '../reducers/bragi';

const reducers = combineReducers({ bragi });

const persistConfig = {key: 'bragi', storage}

const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export default function App({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>);
}
