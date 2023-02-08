import React, { useState, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { addRoom, deleteRooms, getRooms } from "../../actions/room";
import moments from "moment";

const RoomManagement = ({ getRooms, deleteRooms, addRooms, rooms }) => {
  const [formData, setFormData] = useState({
    room: "",
  });
  const { room } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addRooms(room);
  };

  let count = 1;
  let roomList = rooms.rooms.map((room) => {
    return (
      <Table.Row key={room._id}>
        <Table.Cell>{count++}</Table.Cell>
        <Table.Cell>{room.room}</Table.Cell>
        <Table.Cell>{moments(room.created).format("LLL")}</Table.Cell>
        <Table.Cell
          onClick={() => {
            deleteRooms(room._id);
          }}
        >
          <Icon className="trashCan" name="trash alternate" />
        </Table.Cell>
      </Table.Row>
    );
  });

  useEffect(() => {
    getRooms();
  }, [count]);

  return (
    <div>
      <div className="userform">
        <h3 className="center"> Add New Room</h3>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Room Name"
                name="room"
                value={room}
                required
                onChange={onChange}
              />
            </div>
          </div>
          <div className="center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <div className="col">
          <h3 className="center">Created Rooms</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>s/n</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>createdAt</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{roomList}</Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addRooms: (room) => dispatch(addRoom(room)),
    getRooms: () => dispatch(getRooms()),
    deleteRooms: (id) => dispatch(deleteRooms(id)),
  };
};
const mapStateToProps = (state) => ({
  rooms: state.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomManagement);
