import { ADD_CONTECT, DELETE_CONTECT, EDIT_CONTECT, GET_CONTECT } from "../ActionTypes";

export const contectreducer = (action, state) => {

    switch (action.type) {
        case ADD_CONTECT:

            return {
                ...state,
                contect: state.contect.concat(action.payload)

            }
        case GET_CONTECT:

            return {
                ...state,
                contect: action.payload
            }
        case DELETE_CONTECT:
            return {
                ...state,
                contect: state.contect.filter(v => v.id !== action.payload)
            };
        case EDIT_CONTECT:
            const { id, newData } = action.payload;
            return {
                ...state,
                contect : state.contect.map((v)=>{
                    if (v.id === action.payload.id) {
                        return action.payload
                    }else{
                        return v;
                    }
                })
            };
        default:
            return state;
    }
}