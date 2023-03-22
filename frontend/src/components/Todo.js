import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'todos': [],
            'headers': this.props.get_headers()
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/todo/', { 'headers': this.state.headers })
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
            <TodosList headers={this.state.headers} todos={this.state.todos} />
        );
    }

}


const TodosItem = ({ todo, headers }) => {
    return (
        <tr>
            <td>
                <GetData headers={headers} user={todo.user} />
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                <GetData headers={headers} project={todo.project} />
            </td>
        </tr>
    );
};


const TodosList = ({ todos, headers }) => {
    return (
        <Table striped hover variant="dark" >
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodosItem headers={headers} key={todo.url} todo={todo} />)}
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