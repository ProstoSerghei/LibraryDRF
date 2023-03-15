import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'todos': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/todo/')
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
            <TodosList todos={this.state.todos} />
        );
    }

}


const TodosItem = ({ todo }) => {
    return (
        <tr>
            <td>
                <GetData user={todo.user} />
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                <GetData project={todo.project} />
            </td>
        </tr>
    );
};


const TodosList = ({ todos }) => {
    if (todos.length < 1) {
        return (
            <Spinner animation="border" role="status" className='spinner-table'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    return (
        <Table striped bordered hover variant="dark" >
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodosItem key={todo.url} todo={todo} />)}
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
        if (this.projectUrl) {
            url = this.projectUrl;
            field = 'name'
        } else if (this.userUrl) {
            url = this.userUrl;
            field = 'userName'
        }
        axios.get(url)
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