// src/redux/slice/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/products/list-products');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addProducts = createAsyncThunk('products/addProducts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/v1/products/add-products', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteProducts = createAsyncThunk('products/deleteProducts', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/products/delete-products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editProducts = createAsyncThunk('products/editProducts', async (data, { rejectWithValue }) => {
  try {
    await axios.put(`http://localhost:5000/api/v1/products/update-products/${data._id}`, data);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
