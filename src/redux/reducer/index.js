import { combineReducers } from "redux";
import { FacilitesReducer } from "./fesellity.reducer";
import { productsReducer } from "./product.reducer";

export const rootReducer = combineReducers({
    facilites : FacilitesReducer,
    products:productsReducer,
})