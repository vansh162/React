import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moviesData } from '../../data/moviesData';

// Simulate API delay for better UX (optional - remove if you want instant loading)
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await simulateDelay(200);
      return moviesData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch movies');
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await simulateDelay(200);
      const sortedMovies = [...moviesData]
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, 6);
      return sortedMovies;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch popular movies');
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // Simulate network delay for search
      await simulateDelay(150);
      const filteredMovies = moviesData.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
        movie.cast.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      return filteredMovies;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search movies');
    }
  }
);

const initialState = {
  movies: [],
  searchResults: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer; 