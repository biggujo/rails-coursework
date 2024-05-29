import { configureStore } from '@reduxjs/toolkit';
import { chatHistoryReducer } from './chatMessages/slice.ts';
import { profileReducer } from './profile/slice.ts';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authReducer } from './auth/slice.ts';
import { Persistor } from 'redux-persist/es/types';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import { chatListReducer } from './chatList/slice.ts';

const persistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    chatMessages: chatHistoryReducer,
    chatList: chatListReducer,
    // @ts-expect-error because of non-existing types on persistor
    auth: persistReducer(persistConfig, authReducer),
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'chatMessages/connectChat',
        ],
        ignoredPaths: ['chatMessages.connection'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor: Persistor = persistStore(store);
