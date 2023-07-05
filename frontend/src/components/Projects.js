import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProjectForm from './ProjectForm';
import Form from 'react-bootstrap/Form'
import { NavLink } from 'react-router-dom';


const baseUrl = 'https://drf-server.onrender.com';

export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'projects': [],
            'headers': this.props.get_headers(),
            'show': false,
            'search': ''
        };
    }

    fetchData() {
        const headers = this.state.headers;
        axios.get(baseUrl + '/api/projects/', { headers })
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.fetchData();
    }

    searchGet() {
        const headers = this.state.headers;
        axios.get(`${baseUrl}/api/projects/?name=${this.state.search}`, { headers })
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error))
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    render() {
        return (
            <>
                <Form className="d-flex" style={{ margin: '20px auto', width: '50%' }} onSubmit={(event) => { this.searchGet(); event.preventDefault(); }}>
                    <Form.Control
                        type="search"
                        placeholder="Поиск по названию проекта"
                        className="me-2"
                        aria-label="Search"
                        name='search'
                        onChange={(event) => this.handleChange(event)}
                    />
                    <Button
                        variant="outline-success"
                        onClick={() => this.searchGet()}
                    >Поиск</Button>
                </Form>
                <ProjectsList deleteItem={(url, headers) => this.props.deleteItem(url, headers)} headers={this.state.headers} projects={this.state.projects} />
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Добавить проект
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectForm headers={this.state.headers} parent={this} />
                    </Modal.Body>
                </Modal>
                <Button variant='success' style={{ display: 'block', margin: '20px auto' }} onClick={() => this.setState({ show: true })}>Добавить Проект</Button>
            </>
        );
    }

}


const ProjectsItem = ({ project, headers, deleteItem }) => {
    const url = `${baseUrl}/api/projects/${project.pk}`
    let repoLink = ''
    if (project.repoLink.includes('http')) {
        repoLink = project.repoLink;
    } else {
    }
    return (
        <tr className={`projectRow${project.pk}`}>
            <td>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/projects/' + project.pk}>{project.name}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </td>
            <td>
                <Nav variant="">
                    <Nav.Item>
                        <Nav.Link href={repoLink} target='_blank' className={!repoLink && 'disabled'} >Репозиторий</Nav.Link>
                    </Nav.Item>
                </Nav>
            </td>
            <td>
                {project.users.map((url) => <GetUser headers={headers} key={url} url={url} />)}
            </td>
            <td>
                <Button style={{ margin: '5px' }} variant="danger" onClick={() => { deleteItem(url, headers); hideItem(project.pk) }}>Delete</Button>
            </td>
        </tr>
    );
};


const ProjectsList = ({ projects, headers, deleteItem }) => {
    return (
        <Table striped hover variant="dark" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Repo link</th>
                    <th>Users</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectsItem deleteItem={(url, headers) => deleteItem(url, headers)} headers={headers} key={project.url} project={project} />)}
            </tbody>
        </Table>
    );
};

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'url': props.url,
            'userName': ''
        };
    }

    componentDidMount() {
        const headers = this.props.headers;
        axios.get(this.state.url, { headers })
            .then(response => {
                const userName = response.data.userName;
                this.setState(
                    {
                        'userName': userName,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <p>{this.state.userName}</p>
        );
    }

}


function hideItem(elId) {
    document.querySelector(`.projectRow${elId}`).style.display = 'none';
}

