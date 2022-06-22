import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
 deleteMessages, addMessages, getMessages
} from "../../actions/messages";
import { Icon } from "semantic-ui-react";
import Avatar from "react-avatar";
import moments from "moment"
//import { addMessages, getMessages } from "../../utils/services/message-services";


const MessageForm = ({ getMessages, addMessages, deleteMessages, messages, roomId}) => {
  useEffect(() => {
    getMessages(roomId);
  }, [messages]);

  const [formData, setFormData] = useState({
    text: "",
  });

  const { text } = formData;

  let messagesEnd;
  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addMessages(text, roomId);
    setFormData({ text: "" });
    scrollToBottom();
  };

  const user = JSON.parse(localStorage.getItem("user"));
  let messageList = messages.messages.map((message) => {
    return message.user === user._id ? (
      <div className="row">
        <div className="container darker col-6" key={message._id}>
          <div className="username"> {message.name}</div>
          <Avatar
            size="50"
            round={true}
            src={message.avatar}
            className="right"
          />
          <p>{message.text.toString()}</p>
          <span className="time-left">
            {moments(message.createdAt).format("LLL")}
          </span>
          <span className="time-right">
            <Icon
              onClick={() => {
                deleteMessages(message._id);
              }}
              name="trash alternate"
              className="trashCan"
            />
          </span>
        </div>
      </div>
    ) : (
      <div className="row justify-content-end">
        <div className="container darker senders col-6 " key={message._id}>
          <div className="username"> {message.name}</div>
          <Avatar
            size="50"
            round={true}
            src={message.avatar}
            className="right"
          />
          <p>{message.text}</p>
          <span className="time-left">
            {moments(message.createdAt).format("LLL")}
          </span>
          <span className="time-right">
            <Icon
              onClick={() => {
                deleteMessages(message._id);
              }}
              name="trash alternate"
              className="trashCan"
            />
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="messageArea"> 

    <div className="col-12 center topbar no-gutters">
            <h3 className="text">ProGela</h3>
    </div>

    <div className="">
      <div className="textarea">
        {messageList}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
      </div>

      <form className="row inputBox" onSubmit={onSubmit}>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Message"
            aria-label="Enter Message"
            aria-describedby="basic-addon2"
            id="text"
            value={text}
            name="text"
            onChange={onChange}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-outline-secondary" type="submit">
          <i className="material-icons">send</i>
          </button>
        </div>
      </form>
    </div>
    </div>

  );
};
const mapDispatchToProps = (dispatch) => ({
  addMessages: (text, roomId) => dispatch(addMessages(text, roomId)),
  getMessages: (roomId) => dispatch(getMessages(roomId)),
  deleteMessages: (id) => dispatch(deleteMessages(id)),
});

const mapStateToProps = (state, props) => ({
  messages: state.messages,
  roomId: props.location.state.roomId,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);

// const MessageForm = ({ deleteMessages, messages, roomId,}) => {
  
//   const [newMessages, setNewMessages] = useState([]);

//   let response;
//   const fetchMessages = async () => {
//     response = await getMessages(roomId);
//     console.log(response);
//     setNewMessages(response)
//   }
//   useEffect(() => {
//     scrollToBottom();
//     fetchMessages();
//   }, [roomId, newMessages]);

  
//   const [formData, setFormData] = useState({
//     text: "",
//   });

//   const { text } = formData;

//   let messagesEnd;
//   const scrollToBottom = () => {
//     messagesEnd.scrollIntoView({ behavior: "smooth" });
//   };

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     response = await addMessages(text, roomId);
//     console.log(response)
//     setNewMessages(response);
//     setFormData({ text: "" });
//   };


//   let user = JSON.parse(localStorage.getItem("user"));
//   let messageList = newMessages.length > 0 ? newMessages.map((message) => {

//     return message.user === user._id ? (
//       <div className="row">
//         <div className="container darker col-6" key={message._id}>
//           <div className="username"> {message.name}</div>
//           <Avatar
//             size="50"
//             round={true}
//             src={message.avatar}
//             className="right"
//           />
//           <p>{message.text.toString()}</p>
//           <span className="time-left">
//             {moments(message.createdAt).format("LLL")}
//           </span>
//           <span className="time-right">
//             <Icon
//               onClick={() => {
//                 deleteMessages(message._id);
//               }}
//               name="trash alternate"
//               className="trashCan"
//             />
//           </span>
//         </div>
//       </div>
//     ) : (
//       <div className="row justify-content-end">
//         <div className="container darker senders col-6 " key={message._id}>
//           <div className="username"> {message.name}</div>
//           <Avatar
//             size="50"
//             round={true}
//             src={message.avatar}
//             className="right"
//           />
//           <p>{message.text.toString()}</p>
//           <span className="time-left">
//             {moments(message.createdAt).format("LLL")}
//           </span>
//           <span className="time-right">
//             <Icon
//               onClick={() => {
//                 deleteMessages(message._id);
//               }}
//               name="trash alternate"
//               className="trashCan"
//             />
//           </span>
//         </div>
//       </div>
//     );
//   }):" ";

//   return (
//     <div className="messageArea">
//       <div className="textarea">
//         {messageList}
//         <div
//           style={{ float: "left", clear: "both" }}
//           ref={(el) => {
//             messagesEnd = el;
//           }}
//         ></div>
//       </div>

//       <form className="row inputBox" onSubmit={onSubmit}>
//         <div className="col-10">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Message"
//             aria-label="Enter Message"
//             aria-describedby="basic-addon2"
//             id="text"
//             value={text}
//             name="text"
//             onChange={onChange}
//           />
//         </div>
//         <div className="col-2">
//           <button className="btn btn-outline-secondary" type="submit">
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// const mapDispatchToProps = (dispatch) => ({
//   //addMessages: (text, roomId) => dispatch(addMessages(text, roomId)),
//   //getMessages: (roomId) => dispatch(getMessages(roomId)),
//   deleteMessages: (id) => dispatch(deleteMessages(id)),
// });

// const mapStateToProps = (state, props) => ({
//   messages: state.messages,
//   roomId: props.location.state.roomId,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
// //export default connect(mapStateToProps)(MessageForm);