import { LOGIN_SUCCESS, LOGOUT} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  isTrue: false
};

export default function (state= initialState, action){
    const {type, payload} = action;

    switch (type){
        case LOGIN_SUCCESS:
        return {
            ...state,
            user:payload.user,
            token: payload.token,
            isTrue: true
        }
        case LOGOUT:
          return{
            ...state,
            user: null,
            token: null,

        }
      default: return state; 
    }
}