import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Users from './components/Users.js';
import Projects from './components/Projects.js';
import Todos from './components/Todo.js';
import ProjectDetail from './components/ProjectsDetail.js';


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Users</Nav.Link>
                <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                <Nav.Link as={NavLink} to="/todos">Todos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className='content'>
          <Routes>
            <Route path='/' element={
              <Users />
            } />
            <Route path='/projects' element={
              <Projects />
            } />
            <Route path='/todos' element={
              <Todos />
            } />
            <Route path='/projects/:pk' element={
              <ProjectDetail />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

}



export default App;
