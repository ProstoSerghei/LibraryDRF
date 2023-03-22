import React from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <Container style={{ marginTop: '40px' }} >
                <Row className="justify-content-md-center">
                    <Col xs md="4" style={{ boxShadow: '0px 0px 10px 1px #a3a3a3', boxSizing: 'border-box', padding: '40px', borderRadius: '20px' }}>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <Form.Group className="mb-3" controlId="formLogin">
                                <Form.Label>User name</Form.Label>
                                <Form.Control name="login" type="text" placeholder="Enter username" value={this.state.login} onChange={(event) => this.handleChange(event)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}