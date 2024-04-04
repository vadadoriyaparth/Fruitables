import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { GET_PRODUCT } from '../AcationType';

export const getProducts = () => async(dispatch) =>{
try {
    await axios.get(baseURL + 'Products')
    .then( (response) =>{
        dispatch({type:GET_PRODUCT, payload: response.data}) 
        // console.log(response.data);
      })
      .catch( (error) =>{
        console.log(error);
      })
} catch (error) {
    
}
}