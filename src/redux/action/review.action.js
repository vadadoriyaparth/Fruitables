import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';
import { DELETE_REVIEW, EDIT_REVIEW, GET_REVIEW } from '../AcationType';


export const getreview = (data) => async (dispatch) => {
  try {

    await axios.post(baseURL + 'reviews',data)
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: GET_REVIEW, payload: response.data })

        }, 2000)
        console.log(response.data);
      })
      .catch((error) => {
      })
  } catch (error) {
    console.log(error);

  }
}

export const deletereview = (id) =>async (dispatch) =>{
try {
  await axios.delete(baseURL + 'reviews/' + id)
  .then((response) => dispatch({type:DELETE_REVIEW,payload:id}))
  .catch((error) => console.log(error.message)
);
} catch (error) {
  console.log(error);
}

}
export const editreview = (data) =>async (dispatch) =>{
  try {
    await axios.put(baseURL + 'reviews/' + data.id,data)
    .then((response) => dispatch({type:EDIT_REVIEW,payload:data}))
    .catch((error) => console.log(error.message)
  );
  } catch (error) {
    console.log(error);
  }
  
  }