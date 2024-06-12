import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LODAING_PRODUCT } from '../AcationType';
import { type } from '@testing-library/user-event/dist/type';


export const productdataloding = () => (dispatch) => {
  dispatch({ type: LODAING_PRODUCT })
}
 const productdataerror = (error) => (dispatch) => {
  dispatch({ type: ERROR_PRODUCT , payload: error})
}
export const getProducts = () => async (dispatch) => {
  try {
    dispatch(productdataloding());

    await axios.get("http://localhost:5000/api/v1/products/list-products")
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: GET_PRODUCT, payload: response.data })

        }, 2000)
        console.log(response.data);
      })
      .catch((error) => {
       dispatch(productdataerror(error.message))
      })
  } catch (error) {
    console.log(error);

  }
}

export const addProducts = (data) => async (dispatch) => {
  
  try {
    // dispatch(productdataloding());

    await axios.post("http://localhost:5000/api/v1/products/add-products",data)
      .then((response) => dispatch({type:ADD_PRODUCT,payload:response.data}))
      .catch((error) => console.log(error))
  } catch (error) {
    dispatch(productdataerror(error.message))


  }
}

export const DeleteProducts = (id) => async (dispatch) => {
  try {
    dispatch(productdataloding());

    await axios.delete("http://localhost:5000/api/v1/products/delete-products/"+id)
      .then((response) => dispatch({type:DELETE_PRODUCT,payload:id}))
      .catch((error) => console.log(dispatch(productdataerror(error.message))
    ))
  } catch (error) {
    dispatch(productdataerror(error.message))


  }
}
export const EditeProducts = (data) => async (dispatch) => {
  try {
    dispatch(productdataloding());

    await axios.put("http://localhost:5000/api/v1/products/update-products/"+data._id,data)
      .then((response) => dispatch({type:EDIT_PRODUCT,payload:data}))
      .catch((error) => console.log(error))
  } catch (error) {
    console.log(dispatch(productdataerror(error.message))
  );

  }
}