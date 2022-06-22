import React, { useEffect } from "react";

import { Redirect, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getRooms } from "../../actions/room";
import Avatar from "react-avatar";
import { logout } from "../../actions/auth";

const Dashboard = (props) => {
  const  user  = JSON.parse(localStorage.getItem('user'));
  const room = props.room.rooms;
  console.log(user)
  useEffect(() => {
    props.getRooms();

  },[]);

  const roomList = room.map((room) => {
    return !room || !room.length ? (
      <NavLink
        className="nav-link nav-item"
        activeClassName="is-active"
        to={{
          pathname: `/messages/${room._id}`,
          state: { roomId: `${room._id}` },
        }}
        key={room._id}
      >
        {room.room}

        <span>
          <i className="material-icons space">question_answer</i>
        </span>
      </NavLink>
    ) : (
      <NavLink className="nav-link ">
        Room Loading...
        <span>
          <i className="material-icons space">home</i>
        </span>
      </NavLink>
    );
  });

  if (!user) return <Redirect to="/signin" />;


  return (
    <div className="row no-gutters displayPostion">
      <div className="col-3 no-gutters">
        <ul className="flex-column sidebar">
          <div className="center text">
            <h3>{user.name}</h3>
          </div>
          <div className=" center  userAvatar">
            <Avatar size="100" round={true} src={user.avatar} />
          </div>
          <div className="room-border">
            <li className="">{roomList}</li>
          </div>
          {user.role === "ADMIN" ? (
            <div className="admin-panel">
              <div className="center text">
                <h3>Admin Panel</h3>
              </div>
              <li className="nav-item active">
                <NavLink
                  className="nav-link "
                  activeClassName="is-active"
                  to="/admin-panel/user-management"
                >
                  User Management
                  <span>
                    <i className="material-icons space">person_add</i>
                  </span>
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink
                  className="nav-link "
                  activeClassName="is-active"
                  to="/admin-panel/room-management"
                >
                  Room Management
                  <span>
                    <i className="material-icons space">forum</i>
                  </span>
                </NavLink>
              </li>
            </div>
          ) : (
            <div></div>
          )}

          <li className="nav-item active">
            <NavLink
              className="nav-link "
              activeClassName="is-active"
              to="/signin"
              onClick={() => {
                localStorage.clear();
                props.logout();
              }}
            >
              Logout
              <span>
                <i className="material-icons space">exit_to_app</i>
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="col-9 no-gutters textComponent">
        <div className="row  no-gutters ">
          
          <div className="col-12 no-gutters">
            <main>{props.children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard.propTypes = {
//   room: PropTypes.object.isRequired,
// };

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: () => dispatch(getRooms()),
    logout: () => dispatch(logout()),
  };
};

const mapStateToProps = (state) => ({
  room: state.rooms,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
