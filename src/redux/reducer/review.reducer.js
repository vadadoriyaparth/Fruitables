import { DELETE_REVIEW, EDIT_REVIEW, GET_REVIEW } from "../AcationType";

const initialState = {
    isLoding: false,
    review: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_REVIEW:
            return {
                isLoding: false,
                review: state.review.concat(action.payload),
                error: null
            }
            case DELETE_REVIEW:
                return {
                    isLoding: false,
                    review: state.review.filter((v) =>v.id !== action.payload),
                    error: null
                }
    
                case EDIT_REVIEW:
                    return {
                        isLoding: false,
                        review: state.review.map((v) => {

                            if (v.id === action.payload.id) {
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