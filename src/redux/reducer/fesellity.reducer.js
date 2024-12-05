import { ADD_FESELLITY, DELETE_FESELLITY, EDIT_FESELLITY, GET_FESELLITY, LODAING_FESELLITY } from "../AcationType";

const inistialState = {
    isLoding : false,
    facilites : [],
    error : null
}

export const FacilitesReducer = (state=inistialState,action) => {
    console.log(action);

    switch (action.type) {
        case LODAING_FESELLITY:
            return{
            ...state,
                isLodaing:true,

            }
            case GET_FESELLITY:

        return {
            ...state
        }
        case ADD_FESELLITY:

        return {
            ...state,
            isLodaing:false,
            facilites : state.facilites.concat(action.payload)
        }
            
        case DELETE_FESELLITY:

        return {
            ...state,
            isLodaing:false,

            facilites : state.facilites.filter((v)=>v.id !== action.payload)
        }
    
        case EDIT_FESELLITY:

        return {
            ...state,
            isLodaing:false,

            facilites : state.facilites.map((v)=>{
                if (v.id === action.payload.id) {
                    return action.payload
                }else{
                    return v;
                }
            })
        }
        default:
           return state
    }
}