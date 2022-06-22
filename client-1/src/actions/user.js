import api from "../utils/api";
import { ADD_USER, GET_USER, DELETE_USER, USER_ERROR } from "./types";
import { setAlert } from "./alert";
import Axios from "axios";

const token = localStorage.getItem("token");

export const addUser = ({name, email, password, role}) => async (dispatch) =>{
    const body ={name, email, password, role}
    try {
        const res = await Axios.post('/api/users', body, {
            headers: {
              Authorization: token,
            },
          });
        dispatch({
            type: ADD_USER,
            payload: res.data
        });
        dispatch(setAlert('User Added', 'success')) 
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
          console.log(err, err.response)
    }
}

export const getUser = () => async (dispatch) =>{

    try {
        const res = await Axios.get('/api/users', {
            headers: {
                Authorization: token,
            },
          });
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
    }
}

export const deleteUser = (id) => async (dispatch) =>{

    try {
        await Axios.delete(`/api/users/${id}`, {
            headers: {
                Authorization: token,
            },
          });
        dispatch({
            type: DELETE_USER,
        });
        dispatch(setAlert('User Deleted', 'success'))
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });
          console.log(err, err.response)
    }
}