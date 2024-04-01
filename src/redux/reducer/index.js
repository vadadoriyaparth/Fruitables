import { combineReducers } from "redux";
import { FacilitesReducer } from "./fesellity.reducer";

export const rootReducer = combineReducers({
    facilites : FacilitesReducer,
})