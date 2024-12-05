import { ADD_FESELLITY, DELETE_FESELLITY, EDIT_FESELLITY, GET_FESELLITY, LODAING_FESELLITY } from "../AcationType"
export const handleLodaing = () => (dispatch) => {
    dispatch({ type: LODAING_FESELLITY})
}
export const facilites_data = (data) => (dispatch) => {
    dispatch(handleLodaing());
    setTimeout(()=>{
        dispatch({ type: ADD_FESELLITY, payload: data })

    },2000)
}
export const delete_data = (id) => (dispatch) => {
    dispatch({ type: DELETE_FESELLITY, payload: id })
}
export const edite_data = (data) => (dispatch) => {
    dispatch({ type: EDIT_FESELLITY, payload: data })
}
export const  getfesellity=()=>(dispatch)=>{
    dispatch({type:GET_FESELLITY});
}
