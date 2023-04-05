import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: props.projectId,
            userId: props.userId,
            projectName: props.projectName,
            desc: '',
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
            text: this.state.desc,
            project: `http://127.0.0.1:8000/api/projects/${this.state.projectId}/`,
            user: `http://127.0.0.1:8000/api/users/${this.state.userId}/`
        };
        const headers = this.state.headers;
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, { headers })
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
                        <h4>{this.state.projectName}</h4>
                        <br />
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <Form.Group className="mb-3" controlId="formLogin">
                                <Form.Label>Опсиание</Form.Label>
                                <Form.Control name="desc" as="textarea" placeholder="Введите текст описания" rows={3} value={this.state.desc} onChange={(event) => this.handleChange(event)} />
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