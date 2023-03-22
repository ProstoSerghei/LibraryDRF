import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

import { NavLink } from 'react-router-dom';


export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'projects': [],
            'headers': this.props.get_headers()
        };
    }

    componentDidMount() {
        const headers = this.state.headers;
        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
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
            <ProjectsList headers={this.state.headers} projects={this.state.projects} />
        );
    }

}


const ProjectsItem = ({ project, headers }) => {
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
                <Nav variant="">
                    <Nav.Item>
                        <Nav.Link href={repoLink} target='_blank' className={!repoLink && 'disabled'} >Репозиторий</Nav.Link>
                    </Nav.Item>
                </Nav>
            </td>
            <td>
                {project.users.map((url) => <GetUser headers={headers} key={url} url={url} />)}
            </td>
        </tr>
    );
};


const ProjectsList = ({ projects, headers }) => {
    return (
        <Table striped hover variant="dark" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Repo link</th>
                    <th>Users</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectsItem headers={headers} key={project.url} project={project} />)}
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