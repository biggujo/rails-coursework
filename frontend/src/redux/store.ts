import { configureStore } from '@reduxjs/toolkit';
import { chatHistoryReducer } from './chatMessages/slice.ts';

const store = configureStore({
  reducer: {
    chatMessages: chatHistoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ['chatMessages/connectChat'],
        ignoredPaths: ['chatMessages.connection'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
