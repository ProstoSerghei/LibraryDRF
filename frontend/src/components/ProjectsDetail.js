import React from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


class ProjectDetailPk extends React.Component {

    constructor(props) {
        super(props);
        this.pk = props.pk;
        this.apiUrl = 'http://127.0.0.1:8000/api/projects/' + this.pk;
        this.state = {
            'data': [],
            'users': [],
            'todos': [],
            'headers': this.props.headers
        }
    }

    componentDidMount() {
        const headers = this.state.headers;
        axios.get(this.apiUrl, { headers })
            .then(response => {
                const data = response.data;
                this.setState({
                    'data': data
                })
                return data;
            })
            .then(response => {
                let users = [];
                let usersLength = response.users.length;
                let projectName = response.name;
                response.users.forEach((user) => {
                    axios.get(user, { headers })
                        .then(response => {
                            const data = response.data;
                            users.push({ 'name': `${data.firstName} ${data.lastName}`, 'pk': data.pk });
                            return;
                        }).then(response => {
                            if (users.length === usersLength) {
                                this.setState({
                                    'users': users,
                                })
                            }
                        }).catch(error => console.log(error))
                });

                axios.get('http://127.0.0.1:8000/api/todo/?project=' + projectName, { headers })
                    .then(response => {
                        return response.data.results;
                    })
                    .then(response => {
                        let todosLength = response.length;
                        let totalData = [];
                        response.forEach(todo => {
                            axios.get(todo.user, { headers })
                                .then(response => {
                                    todo.userName = response.data.userName;
                                    totalData.push(todo);

                                    if (totalData.length === todosLength) {
                                        this.setState({
                                            'todos': totalData
                                        });
                                    }
                                }).catch(error => console.log(error))
                        })
                    })
            }).catch(error => console.log(error))

    }

    render() {
        const data = this.state.data;
        const users = this.state.users;
        const todos = this.state.todos;
        return (
            <Container className="project-detail-content">
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <h1>{data.name}</h1>
                        <hr />
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center', marginTop: '20px' }} className="justify-content-md-center">
                    <Col>
                        <h3>{todos.length > 1 ? 'Заметки проекта' : ''}</h3>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }} className="justify-content-md-center">
                    {todos.map(todo => (<Col key={todo.url} md="auto"><ProjectTodosList todo={todo} /></Col>))}
                </Row>
                <Row style={{ marginTop: '40px' }} className="justify-content-md-center">
                    <Col xl="auto">
                        <h3>Участники проекта</h3>
                        <br />
                        <ListGroup>
                            {users.map((user) => <ListGroup.Item key={user.pk} action variant="info">{user.name}</ListGroup.Item>)}
                        </ListGroup>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button href={data.repoLink} target='_blank' variant="success" className={!(data.repoLink?.includes('http')) && 'disabled'} >Репозиторий</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
        );
    }
}

const ProjectTodosList = ({ todo }) => {
    return (
        <Card bg='dark' style={{ width: '18rem', minHeight: '200px', margin: '0 auto 20px' }}>
            <Card.Body>
                <Card.Title>Автор: {todo.userName}</Card.Title>
                <Card.Text>
                    {todo.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default function ProjectDetail(props) {
    const { pk } = useParams();
    const headers = props.get_headers();
    return (
        <ProjectDetailPk headers={headers} pk={pk} />
    );
}