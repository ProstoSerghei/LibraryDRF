import React from 'react'
import Table from 'react-bootstrap/Table';


const UserItem = ({ user }) => {
    return (
        <tbody>
            <tr>
                <td>
                    {user.user_name}
                </td>
                <td>
                    {user.first_name}
                </td>
                <td>
                    {user.last_name}
                </td>
                <td>
                    {user.email}
                </td>
            </tr>
        </tbody>
    )
}

const UsersList = ({ users }) => {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>User name</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
            </thead>
            {users.map((user) => <UserItem user={user} />)}
        </Table>
    )
}

export default UsersList