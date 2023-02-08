// import api from ' ../utils/api'
// import { setAlert } from "./alert";
import Axios from 'axios';
 
const token = localStorage.getItem("token");

export const getMessages = async (roomId) =>{

    try {
      const res = await Axios.get(`/api/messages/${roomId}`, {
            headers: {
                Authorization: token,
            },
          });

        return res.data
    } catch (err) {
        const payload = { msg: err.response.statusText, status: err.response.status}
    
        console.log(err.message)

        return payload;
          
    }

}

export const addMessages = async (text, roomId) =>{
    const body = {text}

    try {
        const res = await Axios.post(`/api/messages/${roomId}`, body, {
            headers: {
                Authorization: token,
            },
          });
           console.log(res)
          return res.data;

    } catch (err) {
        const payload = { msg: err.response.statusText, status: err.response.status}
    
          console.log(err.message)

          return payload;
          
    }

}

// export const deleteMessages = (id)=> async dispatch =>{
//     try {
//         const token = localStorage.getItem("token");
//         await Axios.delete(`/api/messages/${id}`, {
//             headers: {
//                 Authorization: token,
//             },
//           });
//         dispatch({
//             type: DELETE_MESSAGE,
//         });
//         dispatch(setAlert("Message Deleted", "success"));  


//     } catch (err) {
//         dispatch({
//             type: MESSAGE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status},
          
//           });
//           const msg = err.response.data.msg.toString();
//           dispatch(setAlert(`${msg}`, "success")); 
//           console.log(err.message)
          
//     }

// }