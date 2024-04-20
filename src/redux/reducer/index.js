import { combineReducers } from "redux";
import { FacilitesReducer } from "./fesellity.reducer";
import { productsReducer } from "./product.reducer";
import { shopReducer } from "./shop.reducer";
import { shopdiReducer } from "./shopdetail.reducer";
import { reviewReducer } from "./review.reducer";
import { cartReducer } from "./cart.reducer";
import cartSlice from "../slice/cart.slice";
import counterSlice from "../slice/counter.slice";

export const rootReducer = combineReducers({
    facilites : FacilitesReducer,
    products:productsReducer,
    shop:shopReducer,
    shopdi:shopdiReducer,
    review:reviewReducer,
    cart: cartReducer,
    counter:counterSlice,
    Addtocart:cartSlice

})