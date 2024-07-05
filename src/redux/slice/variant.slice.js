import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    variants: [],
    error: null,
};

export const getVariants = createAsyncThunk(
    'variants/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/variants/list-variants");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addVariant = createAsyncThunk(
    'variants/add',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/variants/add-variants/", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editVariant = createAsyncThunk(
    'variants/edit',
    async (data, thunkAPI) => {
        try {
            const response = await axios.put("http://localhost:5000/api/v1/variants/update-variants/" + data._id, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteVariant = createAsyncThunk(
    'variants/delete',
    async (id, thunkAPI) => {
        try {
            await axios.delete("http://localhost:5000/api/v1/variants/delete-variants/" + id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const variantSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVariants.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getVariants.fulfilled, (state, action) => {
                state.variants = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getVariants.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addVariant.fulfilled, (state, action) => {
                state.variants.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(editVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editVariant.fulfilled, (state, action) => {
                state.variants = state.variants.map((v) =>
                    v._id === action.payload.data._id ? action.payload.data : v
                );
                state.isLoading = false;
            })
            .addCase(editVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVariant.fulfilled, (state, action) => {
                state.variants = state.variants.filter((variant) => variant._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export default variantSlice.reducer;
