import { ADD_PRODUCT, GET_PRODUCT } from "../AcationType";

const initialState = {
    isLoding:false,
    products:[],
    error:null
}

export const  productsReducer = (state = initialState , action) => {
console.log(action);

    switch (action.type) {
        case GET_PRODUCT:
            return{
                isLoding:false,
                products:action.payload,
                error:null
            }
    
        default:
            return state;
    }
}