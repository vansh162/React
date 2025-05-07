import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: [],
  watchlist: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      const savedFavorites = localStorage.getItem('favorites');
      const savedWatchlist = localStorage.getItem('watchlist');
      state.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      state.watchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
      state.watchlist = [];
      localStorage.removeItem('favorites');
      localStorage.removeItem('watchlist');
    },
    toggleFavorite: (state, action) => {
      const movieTitle = action.payload;
      const index = state.favorites.indexOf(movieTitle);
      if (index === -1) {
        state.favorites.push(movieTitle);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    toggleWatchlist: (state, action) => {
      const movieTitle = action.payload;
      const index = state.watchlist.indexOf(movieTitle);
      if (index === -1) {
        state.watchlist.push(movieTitle);
      } else {
        state.watchlist.splice(index, 1);
      }
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
  },
});

export const { login, logout, toggleFavorite, toggleWatchlist } = authSlice.actions;
export default authSlice.reducer; 