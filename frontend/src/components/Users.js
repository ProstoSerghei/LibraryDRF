import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <UsersList users={this.state.users} />
        );
    }

}


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.userName}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    );
};

const UsersList = ({ users }) => {
    return (
        <Table striped hover variant="dark" >
            <thead>
                <tr>
                    <th>User name</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem key={user.pk} user={user} />)}
            </tbody>
        </Table>
    );
};
