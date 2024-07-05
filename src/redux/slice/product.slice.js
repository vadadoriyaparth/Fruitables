import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  products: [],
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/get',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/products/list-products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProducts = createAsyncThunk(
  'products/add',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/products/add-products", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProducts = createAsyncThunk(
  'products/edit',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/products/update-products/${data._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/delete-products/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(editProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        state.products = state.products.map((v) =>
          v._id === action.payload.data._id ? action.payload.data : v
        );
        state.isLoading = false;
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
