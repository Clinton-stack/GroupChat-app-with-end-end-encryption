import api from '../utils/api'
import { ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGE, MESSAGE_ERROR} from './types';
import { setAlert } from "./alert";
import Axios from 'axios';

const token = localStorage.getItem("token");

export const getMessages = (roomId)=> async dispatch =>{
    
    try {
        const res = await Axios.get(`/api/messages/${roomId}`, {
            headers: {
                Authorization: token,
            },
          });
        dispatch({
            type: GET_MESSAGE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status},
          
          });
          
    }

}

export const addMessages = (text, roomId)=> async dispatch =>{
    const body = {text}
    try {
        const res = await Axios.post(`/api/messages/${roomId}`, body, {
            headers: {
                Authorization: token,
            },
          });
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        });  

    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status},
          
          });
          console.log(err)
          
    }

}

export const deleteMessages = (id)=> async dispatch =>{
    try {
        const token = localStorage.getItem("token");
        await Axios.delete(`/api/messages/${id}`, {
            headers: {
                Authorization: token,
            },
          });
        dispatch({
            type: DELETE_MESSAGE,
        });
        dispatch(setAlert("Message Deleted", "success"));  


    } catch (err) {
        dispatch({
            type: MESSAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status},
          
          });
          const msg = err.response.data.msg.toString();
          dispatch(setAlert(`${msg}`, "success")); 
          console.log(err.message)
          
    }

}