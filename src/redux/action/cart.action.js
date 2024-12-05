import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { ADD_CART, GET_CART } from '../AcationType';

export const addcart=(data)=>async(dispatch)=>{
    console.log(data);
    try {
        await axios.post(baseURL+'reviews',data)
        .then((responce)=>dispatch({type:ADD_CART,payload:responce.data}) )
      .catch((error)=>console.log(error))
    } catch (error) {
        console.log(error);
    }
}
export const getcart=()=>async(dispatch)=>{
    try {
      await axios.get(baseURL+'reviews')
       .then((responce)=>{
          dispatch({type:GET_CART,payload:responce.data})
  
       })
       .catch((error)=>{

       })
       
    } catch (error) {
       
    }
    
  }