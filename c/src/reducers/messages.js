import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGE,
  MESSAGE_ERROR,
} from "../actions/types";

const initialState = {
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [payload, ...state.messages],
      };
    case GET_MESSAGE:
      return {
        ...state,
        messages: payload,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message._id !== payload),
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
