import { GET_SHOP } from "../AcationType";

const initialState = {
    isLoding:false,
    shop:[],
    error:null
}

export const shopReducer = (state=initialState,action) =>{
    console.log(action);
    switch (action.type) {
        case GET_SHOP:
            return{
                isLoding:false,
                shop:action.payload,
                error:null
            }
            
    
        default:
            return state;
    }
}