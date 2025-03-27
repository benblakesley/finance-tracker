import { userReducer } from '@/state/reducers/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './reducers/transactionsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
