import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PRODUCTS_URL } from '../../config/api.js';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(API_PRODUCTS_URL);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    cart: {},
    loading: false,
    error: null
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('Cart', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateCart } = productSlice.actions;
export default productSlice.reducer;