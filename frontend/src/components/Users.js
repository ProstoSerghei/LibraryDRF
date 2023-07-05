import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';



const baseUrl = 'https://drf-server.onrender.com';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        const headers = this.props.get_headers();
        axios.get(baseUrl + '/api/users/', { headers })
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        'users': users.results,
                    }
                )
            }).catch(error => console.log(error.response.data.detail))
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
            <td className='firstName'>
                {user.firstName}
            </td>
            <td className='lastName'>
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
                    <th className='firstName'>First name</th>
                    <th className='lastName'>Last name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem key={user.pk} user={user} />)}
            </tbody>
        </Table>
    );
};


