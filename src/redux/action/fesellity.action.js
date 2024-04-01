import { ADD_FESELLITY, DELETE_FESELLITY } from "../AcationType"

export const facilites_data = (data) => (dispatch) => {
    dispatch({ type: ADD_FESELLITY, payload: data })
}
export const delete_data = (id) => (dispatch) => {
    dispatch({ type: DELETE_FESELLITY, payload: id })
}