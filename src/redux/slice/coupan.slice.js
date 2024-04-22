import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    coupon: [],
    isLoading: false,
    error: null
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState: initialState,
    reducers:{

    }

});


export const getCoupon = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/Coupan");
    } catch (error) {
    }
};

export const addCoupon = (Data) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/Coupan", Data);
    } catch (error) {
    }
};

export const removeCoupon = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:8000/Coupan/${id}`);
    } catch (error) {
    }
}

export const updateCoupon = (id, couponData) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8000/couponCode/${id}`, couponData);
    } catch (error) {
    }
};

export default couponSlice.reducer;