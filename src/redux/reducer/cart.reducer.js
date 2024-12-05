import { ADD_CART, GET_REVIEW } from "../AcationType";

const intilize={
    isloading:false,
    error:null,
    review:[]
}

export const cartReducer=(state=intilize,action)=>{
    console.log(action);
    switch (action.type) {
        case ADD_CART:
            return{
                isloading:false,
                review:state.review.concat(action.payload),
                
                error:null
            }

        case GET_REVIEW:
            return{
                isloading: false,
                review:action.payload,
                error: null
            }
            
        default:
            return state;
    }
}