import { userReducer } from '@/state/reducers/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { expensesReducer } from './reducers/expensesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
