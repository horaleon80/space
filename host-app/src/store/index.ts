import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import selectionReducer from './slices/selectionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    selection: selectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;