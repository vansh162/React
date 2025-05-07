import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/slice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
