import React, { useEffect, useState} from 'react';
import{ connect } from 'react-redux';
import {addUser, deleteUser, getUser } from '../../actions/user'

import { Menu, Table, Icon } from 'semantic-ui-react';

const UserManagement = ({getUsers, users, deleteUser, addUser}) => {
    
    

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
      }); 

      
      const { name, email, password, role} = formData;

      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const onSubmit = (e) =>{
            e.preventDefault();
            addUser(formData);
        }

    let count = 1;

    const usersList = users.users.map((user) => {
        return(
            <Table.Body key={user._id}>
            <Table.Row>
                <Table.Cell>{count++}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell onClick={()=> {deleteUser(user._id)}}><Icon className="trashCan"name='trash alternate' /></Table.Cell>
            </Table.Row> 
        </Table.Body>
        )
    });
        
    useEffect(() => {
        getUsers()
    }, [count])

    return (
        <div>
            <div className="userform">
                <h3 className="center"> Add New User</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={onChange}/>
                        </div>
                        <div className="col">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={onChange}/>
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={onChange}/>
                        </div>
                        <div className="col">
                            <select id="inputState" className="form-control" name="role" value={role} onChange={onChange}>
                                <option defaultValue>Select..Role</option>
                                <option>ADMIN</option>
                                <option>USER</option>
                            </select>
                        </div>
                    </div>
                    <div className="center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
            </div>
            <div>
                <h3 className="center">Registered Users</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>s/n</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {usersList}

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>({
    addUser: (formData) => dispatch(addUser(formData)),
        getUsers: () => dispatch(getUser()) ,
        deleteUser: (id) => dispatch(deleteUser(id))
})
const mapStateToProps = (state) => {
    return{
        users: state.users
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
