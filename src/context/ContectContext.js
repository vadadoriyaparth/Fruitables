import { createContext, useReducer } from "react"
import { contectreducer } from "./reducer/contect.reducer";
import axios from "axios";
import { baseURL } from "../Utils/baseURL";
import { DELETE_CONTECT, EDIT_CONTECT, GET_CONTECT } from "./ActionTypes";

const initialState = {
    isLoding: false,
    contect: [],
    error: null,
}

export const ContectContext=createContext();

export const ContectProvider=({children})=>{
    const [state,dispatch]=useReducer(contectreducer,initialState);

    const addcontect = async(data) =>{
        try {
            const responce =await axios.post(baseURL+"Contect",data)
            return responce.data
        } catch (error) {
            console.log(error.message);
        }
    }

    const getcontect=async()=>{
        try {
            const responce = await axios.get(baseURL+"Contect")
            dispatch({type:GET_CONTECT,payload:responce.data})
            return responce.data

        } catch (error) {
            console.log(error.message);
            
        }
    }
    const deleteContact = async (id) => {
        try {
            await axios.delete(baseURL + `Contact/${id}`);
            dispatch({ type: DELETE_CONTECT, payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };
    const editContact = async (id, newData) => {
        try {
            const response = await axios.put(baseURL + `Contact/${id}`, newData);
            dispatch({ type: EDIT_CONTECT, payload: { id, newData: response.data } });
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    };


    return(
        <ContectContext.Provider 
        value={{
            ...state,
            addcontect,
            getcontect,
            deleteContact,
            editContact,
            dispatch}}
        >
            {children}
        </ContectContext.Provider>
    )
}