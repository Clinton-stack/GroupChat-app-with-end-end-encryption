import { ADD_USER, GET_USER, DELETE_USER, USER_ERROR } from "../actions/types";

const initialState = {
    users: [],
    loading: true,
    error: null
}

export default function (state= initialState, action){
    const {type, payload}=  action;

    switch (type) {
      case ADD_USER:
        return {
          ...state,
          users: [payload, ...state.users], 
          loading: false,
        };
      case GET_USER:
        return {
          ...state,
          users: payload,
          loading: false,
        };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter((user => user._id !== payload)),
          loading: false,
        };
      case USER_ERROR:
        return {
          ...state,
          error: payload,
        };
      default:
        return state;
    }
}