import { ADD_ROOM, DELETE_ROOM, GET_ROOM, ROOM_ERROR } from "../actions/types";

const initialState = {
    rooms: [],
    loading: true,
    error: null
}

export default function (state= initialState, action){
    const {type, payload}=  action;

    switch (type) {
      case ADD_ROOM:
        return {
          ...state,
          rooms: [payload, ...state.rooms],
          loading: false,
        };
      case GET_ROOM:
        return {
          ...state,
          rooms: payload,
          loading: false,
        };
      case DELETE_ROOM:
        return {
          ...state,
          rooms: state.rooms.filter((room) => room._id !== payload),
          loading: false,
        };
      case ROOM_ERROR:
        return {
          ...state,
          error: payload,
        };
      default:
        return state;
    }
}