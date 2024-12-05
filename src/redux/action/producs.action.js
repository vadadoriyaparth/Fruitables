import axios from 'axios';
import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from '../AcationType';

export const getProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axios.get("http://localhost:5000/api/v1/products/list-products");
        dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to fetch products:", error);
    }
};


export const addProducts = (product) => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axios.post("http://localhost:5000/api/v1/products/add-products", product);
        dispatch({ type: ADD_PRODUCTS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to add product:", error);
    }
};


export const editProducts = (product) => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axios.put(`http://localhost:5000/api/v1/products/update-products/${product._id}`, product);
        dispatch({ type: EDIT_PRODUCTS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to edit product:", error);
    }
};

export const deleteProducts = (id) => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        await axios.delete(`http://localhost:5000/api/v1/products/delete-products/${id}`);
        dispatch({ type: DELETE_PRODUCTS, payload: id });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to delete product:", error);
    }
};