// import React, { createContext, useReducer } from "react";
// import axios from "axios"; 
// import { ADD_PRODUCTSS, DELETE_PRODUCTSS, EDIT_PRODUCTSS, GET_PRODUCTSS } from "./ActionTypes";
// import { baseURL } from "../Utils/baseURL";
// import { ProductssReducer } from "./reducer/productss.reducer";

// const initialState = {
//     isLoading: false,
//     Productss: [],
//     error: null,
// };

// export const ProductssContext = createContext();

// export const ProductssProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(ProductssReducer, initialState);

//   const getProductss = async () => {
//         try {
//             const response = await axios.get(baseURL + 'Productss');
//             dispatch({ type: GET_PRODUCTSS, payload: response.data });
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     const addProductss = async (val) => {
//         try {
//             const response = await axios.post(baseURL + 'Productss', val);
//             dispatch({ type: ADD_PRODUCTSS, payload: response.data });
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     const editProductss = async (val) => {
//         try {
//             await axios.put(baseURL + 'Productss/' + val.id, val)
//                 .then(response => dispatch({ type: EDIT_PRODUCTSS, payload: response.data }))
                
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     const deleteProductss = async(id) => {
//         try {
//             await axios.delete(baseURL + 'Productss/' + id)
//                 .then(response => dispatch({ type: DELETE_PRODUCTSS, payload: id }))          
//         } catch (error) {
//             dispatch(error.message)
//         }
//     }
    
//     return (
//         <ProductssContext.Provider
//          value={{ ...state, getProductss,
//          addProductss,
//          editProductss,
//          deleteProductss
//           }}>
//             {children}
//         </ProductssContext.Provider>
//     );
// };