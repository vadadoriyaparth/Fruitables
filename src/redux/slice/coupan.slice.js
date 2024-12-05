import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Utils/baseURL";

const initialState = {
    coupon: [],
    isLoading: false,
    error: null
};
export const addcoupon = createAsyncThunk(
    'add/couponuser',
    async (data) => {
        // console.log(data);
        try {
            const responce = await axios.post(baseURL + 'Coupan', data);
            return responce.data;
            console.log(responce.data);

        } catch (error) {
            console.log(error.message);

        }


    }
)
export const getcoupon = createAsyncThunk(
    'get/couponuser',
    async (data) => {
        // console.log(data);
        try {
            const responce = await axios.get(baseURL + 'Coupan', data);
            return responce.data;
            console.log(responce.data);

        } catch (error) {
            console.log(error.message);

        }


    }
)
export const deletecoupon = createAsyncThunk(
    'delete/couponuser',
    async (id) => {
        // console.log(data);
        try {
            await axios.delete(baseURL + 'Coupan/' + id);
            return id;
           

        } catch (error) {
            console.log(error.message);

        }


    }
)
export const updateCoupon = createAsyncThunk(
    'edite/couponuser',
    
    async (data) => {
        try {
            const response = await axios.put(baseURL + 'Coupan/' + data.id, data);
            return response.data
        } catch (error) {
            console.log(error.message);
        }
    }

)
const couponSlice = createSlice({
    name: "coupan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addcoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.concat(action.payload);

        })
        builder.addCase(getcoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = action.payload;

        })
        builder.addCase(deletecoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.filter(v => v.id !== action.payload);


        })
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                }
                return v;
            });


        })
    },


})


export default couponSlice.reducer;