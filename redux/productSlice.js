import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    cart: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
    addToCart: (state, action) => {
      const productInCart = state.cart.find(item => item.id === action.payload.id);
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      console.log('Cart:', state.cart); // Log the cart to the console
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({ ...item, quantity: 0 }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { increment, decrement, addToCart } = productSlice.actions;
export default productSlice.reducer;
