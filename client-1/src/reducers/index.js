import {combineReducers} from 'redux';
import auth from './auth';
import alert from "./alert";
import rooms from "./rooms";
import users from  './user';
import messages from './messages'

export default combineReducers({
    auth,
    alert,
    rooms,
    users,
    messages
})