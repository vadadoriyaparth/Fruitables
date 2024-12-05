// import { ADD_PRODUCTSS, DELETE_PRODUCTSS, EDIT_PRODUCTSS, GET_PRODUCTSS } from "../ActionTypes";

// export const ProductssReducer =(state,action) => {
//     console.log(action);
//     switch(action.type){
//         case GET_PRODUCTSS:
//             return {
//                 Productss:action.payload
//             }
//         case ADD_PRODUCTSS:
//             return {       
//               Productss:state.Productss.concat(action.payload)
//             };
//         // case EDIT_PRODUCTSS: 
//         //     return {
//         //         Productss: state.Productss.map((v) => {
//         //             if (v.id === action.payload.id) {
//         //                 return action.payload;
//         //             } else {
//         //                 return v;
//         //             }
//         //         }),
//         //     };
//         // case DELETE_PRODUCTSS:
//         //     return {
//         //         Productss: state.Productss.filter((v) => v.id !== action.payload),
//         //     }    
//         default:
//             return state
//     }
// }