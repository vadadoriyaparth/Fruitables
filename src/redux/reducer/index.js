import { combineReducers } from "redux";
import { FacilitesReducer } from "./fesellity.reducer";
import { productsReducer } from "./product.reducer";
import { shopReducer } from "./shop.reducer";
import { shopdiReducer } from "./shopdetail.reducer";
import { reviewReducer } from "./review.reducer";

export const rootReducer = combineReducers({
    facilites : FacilitesReducer,
    products:productsReducer,
    shop:shopReducer,
    shopdi:shopdiReducer,
    review:reviewReducer,


})