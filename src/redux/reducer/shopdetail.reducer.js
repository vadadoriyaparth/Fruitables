import { GET_SHOPDETAILS } from "../AcationType";

const initialState ={
    isLoding:false,
    shopdi:[],
    error:null
}

export const shopdiReducer = (state=initialState,action)=>{
console.log(action);

switch (action.type) {
    case GET_SHOPDETAILS:
        
return{
    isLoding:false,
    shopdi:action.payload,
    error:null
}
    default:
        return state;
}
}