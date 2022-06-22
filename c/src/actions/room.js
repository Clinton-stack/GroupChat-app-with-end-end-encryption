import api from "../utils/api";
import { ADD_ROOM, GET_ROOM, ROOM_ERROR, DELETE_ROOM } from "./types";
import { setAlert } from "./alert";
import Axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";


const token = localStorage.getItem("token");

export const addRoom = (room) => async (dispatch) => {
  const body = { room };
  try {

    const res = await Axios.post("/api/rooms", body, {
      headers: {
        Authorization: token,
      },
    });
    
    dispatch({
      type: ADD_ROOM,
      payload: res.data,
    });
    dispatch(setAlert("Room Created", "success"));
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err.message);
  }
};

export const getRooms = () => async (dispatch) => {
  try {
        //Axios.defaults.headers.common["x-auth-token"] = token;
    const res = await Axios.get("/api/rooms", {
      headers: {
        Authorization : token,
      },
    });
    dispatch({
      type: GET_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const deleteRooms = (id) => async (dispatch) => {
  try {
    await Axios.delete(`/api/rooms/${id}`,{
      headers: {
        Authorization: token,
      },
    } );
    dispatch({
      type: DELETE_ROOM,
    });
    dispatch(setAlert("Room Deleted", "success"));
  } catch (err) {
    dispatch({
      type: ROOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
