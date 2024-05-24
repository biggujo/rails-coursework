import { configureStore } from '@reduxjs/toolkit';
import { chatHistoryReducer } from './chatMessages/slice.ts';
import { profileReducer } from './profile/slice.ts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authReducer } from './auth/slice.ts';
import { Persistor } from 'redux-persist/es/types';

const persistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    chatMessages: chatHistoryReducer,
    // @ts-ignore
    auth: persistReducer(persistConfig, authReducer),
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['chatMessages/connectChat'],
        ignoredPaths: ['chatMessages.connection'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor: Persistor = persistStore(store);
