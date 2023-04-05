import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repo_link: '',
            users: 2,
            headers: props.headers,
            parent: props.parent
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }



    handleSubmit(event) {
        const data = {
            name: this.state.name,
            repo_link: this.state.repo_link,
            users: [`http://127.0.0.1:8000/api/users/${this.state.users}/`]
        };
        const headers = this.state.headers;
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, { headers })
            .then((response) => {
                this.state.parent.fetchData();
            })
        event.preventDefault()
    }


    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col style={{ padding: '20px', boxSizing: 'border-box' }}>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Название проекта</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Введите название" value={this.state.desc} onChange={(event) => this.handleChange(event)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRepo">
                                <Form.Label>Ссылка на репозиторий</Form.Label>
                                <Form.Control name="repo_link" type="text" placeholder="Введите ссылку" value={this.state.desc} onChange={(event) => this.handleChange(event)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" style={{ display: 'block', width: '100%' }} onClick={() => { this.state.parent.setState({ show: false }); }} >
                                Добавить
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}