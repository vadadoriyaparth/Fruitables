import { ADD_FESELLITY, DELETE_FESELLITY } from "../AcationType";

const inistialState = {
    isLodaing : false,
    facilites : [],
    error : null
}

export const FacilitesReducer = (state=inistialState,action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FESELLITY:

        return {
            ...state,
            facilites : state.facilites.concat(action.payload)
        }
            
        case DELETE_FESELLITY:

        return {
            ...state,
            facilites : state.facilites.filter((v)=>v.id !== action.payload)
        }
    
        default:
           return state
    }
}