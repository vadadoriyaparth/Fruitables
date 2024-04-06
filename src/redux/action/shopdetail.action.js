import axios from 'axios';
import { GET_SHOPDETAILS } from '../AcationType';
import { baseURL } from '../../Utils/baseURL';


export const shopditailsget = () => async (dispatch) => {
    try {
        await axios.get(baseURL + 'reviews')
            .then((response) => {
                console.log(response);
                dispatch({ type: GET_SHOPDETAILS, payload: response.data })

            })
            .catch((error) => {
                console.log(error);

            })

    } catch (error) {
        console.log(error);

    }
}