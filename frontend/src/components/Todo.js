import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


const baseUrl = 'http://127.0.0.1:8000';

export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'todos': [],
            'headers': this.props.get_headers()
        };
    }

    componentDidMount() {
        axios.get(baseUrl + '/api/todo/', { 'headers': this.state.headers })
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos': todos,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <TodosList deleteItem={(url, headers) => this.props.deleteItem(url, headers)} headers={this.state.headers} todos={this.state.todos} />
        );
    }

}


const TodosItem = ({ todo, headers, deleteItem }) => {
    const url = `${baseUrl}/api/todo/${todo.pk}`
    return (
        <tr className={`todoRow${todo.pk}`}>
            <td>
                <GetData headers={headers} user={todo.user} />
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                <GetData headers={headers} project={todo.project} />
            </td>
            <td>
                <Button style={{ margin: '5px' }} variant="danger" onClick={() => { deleteItem(url, headers); hideItem(todo.pk) }}>Delete</Button>
            </td>
        </tr>
    );
};


const TodosList = ({ todos, headers, deleteItem }) => {
    return (
        <Table striped hover variant="dark" >
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Project</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodosItem deleteItem={(url, headers) => deleteItem(url, headers)} headers={headers} key={todo.url} todo={todo} />)}
            </tbody>
        </Table>
    );
};

class GetData extends React.Component {
    constructor(props) {
        super(props);
        this.projectUrl = props.project;
        this.userUrl = props.user;
        this.state = {
            'data': ''
        };
    }

    componentDidMount() {
        let url = '';
        let field = '';
        const headers = this.props.headers;
        if (this.projectUrl) {
            url = this.projectUrl;
            field = 'name'
        } else if (this.userUrl) {
            url = this.userUrl;
            field = 'userName'
        }
        axios.get(url, { headers })
            .then(response => {
                const data = response.data;
                this.setState(
                    {
                        'data': data[field],
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <span>{this.state.data}</span>
        );
    }

}

function hideItem(elId) {
    document.querySelector(`.todoRow${elId}`).style.display = 'none';
}