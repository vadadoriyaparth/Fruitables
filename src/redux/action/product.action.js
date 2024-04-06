import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { GET_PRODUCT, LODAING_PRODUCT } from '../AcationType';

export const productdataloding = () => (dispatch) => {
  dispatch({ type: LODAING_PRODUCT })
}
export const getProducts = () => async (dispatch) => {
  try {
    await axios.get(baseURL + 'Products')
      .then((response) => {
        dispatch(productdataloding());
        setTimeout(() => {
          dispatch({ type: GET_PRODUCT, payload: response.data })

        }, 2000)
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  } catch (error) {
    console.log(error);

  }
}
