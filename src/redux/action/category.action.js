import axios from 'axios';
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY } from '../AcationType';




export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/categories/list-categories");
        dispatch({ type: GET_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addCategory = (data) => async (dispatch) => {
    
    try {
        const response = await axios.post("http://localhost:5000/api/v1/categories/add-categories", data);
        dispatch({ type: ADD_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    
    try {
        await axios.delete("http://localhost:5000/api/v1/categories/delete-categories/" + id);
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const editCategory = (data) => async (dispatch) => {
    
    try {
        const response = await axios.put("http://localhost:5000/api/v1/categories/update-categories/" + data._id, data);
        dispatch({ type: EDIT_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};
// import axios from 'axios';
// import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY } from '../AcationType';

// export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

// export const getCategories = () => async (dispatch) => {
//     try {
//         const response = await axios.get("http://localhost:5000/api/v1/categories/list-categories");
//         dispatch({ type: GET_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const addCategory = (data) => async (dispatch) => {
    
//     try {
//         const response = await axios.post("http://localhost:5000/api/v1/categories/add-categories", data);
//         dispatch({ type: ADD_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const deleteCategory = (id) => async (dispatch) => {
    
//     try {
//         await axios.delete("http://localhost:5000/api/v1/categories/delete-categories/" + id);
//         dispatch({ type: DELETE_CATEGORY, payload: id });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const editCategory = (data) => async (dispatch) => {
    
//     try {
//         const response = await axios.put("http://localhost:5000/api/v1/categories/update-categories/" + data._id, data);
//         dispatch({ type: EDIT_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };


