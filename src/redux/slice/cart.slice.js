import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex((v) => v.pid === action.payload);

      if (index !== -1) {
        state.cart[index].qyt++;
      } else {
        state.cart.push({ pid: action.payload, qyt: 1 });
      }
    },
    increment: (state, action) => {
      const index = state.cart.findIndex(v => v.pid === action.payload);
      state.cart[index].qyt++;
    },
    decrement: (state, action) => {
      const index = state.cart.findIndex(v => v.pid === action.payload);
      if (state.cart[index].qyt > 1) {
        state.cart[index].qyt--;
      }
    },
    removedata: (state, action) => {
      const index = state.cart.findIndex(v => v.pid === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const { addToCart, increment, decrement, removedata } = cartSlice.actions;

export default cartSlice.reducer;
