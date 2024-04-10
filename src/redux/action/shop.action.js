import axios from 'axios';
import { GET_SHOP } from '../AcationType';
import { baseURL } from '../../Utils/baseURL';


export const getdatashop = () => async (dispatch) => {
    try {
      await axios.get(baseURL  + 'Products')
        .then((response) => {
         
            dispatch({ type: GET_SHOP, payload: response.data })
  
       
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
  
    }
  }
  