import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from './types';
import { setAlert } from "./alert";
import api from '../utils/api';
import Axios from 'axios';
import { setAuthToken, setUser } from '../utils/setAuthToken';




// Login User
export const login = (body) => async dispatch => {
  //const body = { email, password };
  try {
    const res = await Axios.post('api/auth', body);

    console.log(res.data)
    let user = res.data.user;
    let token = res.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    
    
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;
     if (errors) {
       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
     }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
