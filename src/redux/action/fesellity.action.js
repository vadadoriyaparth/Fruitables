import { Edit } from "@mui/icons-material"
import { ADD_FESELLITY, DELETE_FESELLITY, EDIT_FESELLITY } from "../AcationType"

export const facilites_data = (data) => (dispatch) => {
    dispatch({ type: ADD_FESELLITY, payload: data })
}
export const delete_data = (id) => (dispatch) => {
    dispatch({ type: DELETE_FESELLITY, payload: id })
}
export const edite_data = (data) => (dispatch) => {
    dispatch({ type: EDIT_FESELLITY, payload: data })
}
