import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';

import { NavLink } from 'react-router-dom';


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'projects': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <ProjectsList projects={this.state.projects} />
        );
    }

}


const ProjectsItem = ({ project }) => {
    let repoLink = ''
    if (project.repoLink.includes('http')) {
        repoLink = project.repoLink;
    } else {
    }
    return (
        <tr>
            <td>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/projects/' + project.pk}>{project.name}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </td>
            <td>
                <Nav variant="pills" defaultActiveKey={repoLink}>
                    <Nav.Item>
                        <Nav.Link href={repoLink} target='_blank' className={!repoLink && 'disabled'} >Репозиторий</Nav.Link>
                    </Nav.Item>
                </Nav>
            </td>
            <td>
                {project.users.map((url) => <GetUser key={url} url={url} />)}
            </td>
        </tr>
    );
};


const ProjectsList = ({ projects }) => {
    if (projects.length < 1) {
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
                    <th>Name</th>
                    <th>Repo link</th>
                    <th>Users</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectsItem key={project.url} project={project} />)}
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

        axios.get(this.state.url)
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