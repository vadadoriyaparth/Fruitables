import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODAING_PRODUCT } from "../AcationType";

const initialState = {
    isLoding: false,
    products: [],
    error: null
}
    
export const productsReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case LODAING_PRODUCT:
            return {
                ...state,
                isLoding: true,

            }
        case ERROR_PRODUCT:
            return {
                ...state,
                isLoding: false,
                error: action.payload

            }
        case GET_PRODUCT:
            return {
                isLoding: false,
                products: action.payload,
                error: null
            }

        case ADD_PRODUCT:
            return {
                isLoding: false,
                products: state.products.concat(action.payload),
                error: null
            }

        case DELETE_PRODUCT:
            return {
                isLoding: false,
                products: state.products.filter((v) => v.id !== action.payload),
                error: null
            }
        case EDIT_PRODUCT:
            return {
                isLoding: false,
                products: state.products.map((v) => {

                    if (v.id !== action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                }),
                error: null
            }

        default:
            return state;
    }
}