
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  subcategories: [],
  error: null,
};

export const getSubData = createAsyncThunk('subcategories/get', async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/subcategories/list-subcategories");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const handleAdd = createAsyncThunk('subcategories/add', async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/subcategories/add-subcategories", data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const deleteSubcategory = createAsyncThunk('subcategories/delete', async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/subcategories/delete-subcategories/${id}`);
    return id;
  } catch (error) {
    console.error(error.message);
  }
});

export const handleUpdateData = createAsyncThunk('subcategories/update', async (data) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/v1/subcategories/update-subcategories/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

const subcategorySlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubData.fulfilled, (state, action) => {
        state.subcategories = action.payload.data;
      })
      .addCase(handleAdd.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.concat(action.payload.data);
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.filter((v) => v._id !== action.payload);
      })
      .addCase(handleUpdateData.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((v) =>
          v._id === action.payload.data._id ? action.payload.data : v
        );
      });
  },
});

export default subcategorySlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchSubcategories = createAsyncThunk(
//     'subcategories/fetchSubcategories',
//     async () => {
//         const response = await axios.get('http://localhost:5000/api/v1/subcategories/list-subcategories');
//         return response.data.data;
//     }
// );

// export const addSubcategory = createAsyncThunk(
//     'subcategories/addSubcategory',
//     async (data) => {
//         const response = await axios.post('http://localhost:5000/api/v1/subcategories/add-subcategories', data);
//         return response.data.data;
//     }
// );

// export const updateSubcategory = createAsyncThunk(
//     'subcategories/updateSubcategory',
//     async (data) => {
//         const response = await axios.put(`http://localhost:5000/api/v1/subcategories/update-subcategories/${data._id}`, data);
//         return response.data.data;
//     }
// );

// export const deleteSubCategory = createAsyncThunk(
//     'subcategories/deleteSubcategory',
//     async (id) => {
//         await axios.delete(`http://localhost:5000/api/v1/subcategories/delete-subcategories/${id}`);
//         return id;
//     }
// );

// const subcategorySlice = createSlice({
//     name: 'subcategories',
//     initialState: [],
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSubcategories.fulfilled, (state, action) => {
//                 return action.payload;
//             })
//             .addCase(addSubcategory.fulfilled, (state, action) => {
//                 state.push(action.payload);
//             })
//             .addCase(updateSubcategory.fulfilled, (state, action) => {
//                 const index = state.findIndex(subcategory => subcategory._id === action.payload._id);
//                 if (index !== -1) {
//                     state[index] = action.payload;
//                 }
//             })
//             .addCase(deleteSubCategory.fulfilled, (state, action) => {
//                 return state.filter(subcategory => subcategory._id !== action.payload);
//             });
//     },
// });

// export default subcategorySlice.reducer;
