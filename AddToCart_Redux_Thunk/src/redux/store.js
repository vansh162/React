import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/slice';

export const store = configureStore({
  reducer: {
    products: productReducer
  }
});