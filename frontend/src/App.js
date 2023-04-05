import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Users from './components/Users.js';
import Projects from './components/Projects.js';
import Todos from './components/Todo.js';
import ProjectDetail from './components/ProjectsDetail.js';
import LoginForm from './components/Auth.js';
import axios from 'axios';
import Cookies from 'universal-cookie';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies();
    cookies.set('token', token);
    this.setState({ 'token': token });
  }

  is_authenticated() {
    return this.state.token === '';
  }

  logout() {
    this.set_token('');
  }

  get_token_from_storage() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    this.setState({
      'token': token
    })
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth', { username: username, password: password })
      .then(response => {
        this.set_token(response.data['token']);
      }).catch(error => alert('Что-то пошло не так(\nПроверьте данные авторизации.'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (!this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers;
  }

  componentDidMount() {
    this.get_token_from_storage();
  }

  deleteItem(url, headers) {
    axios.delete(url, { headers })
      .then(response => {
        console.log(response);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className='main'>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/">Users</Nav.Link>
                  <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                  <Nav.Link as={NavLink} to="/todos">Todos</Nav.Link>
                </Nav>
                <Nav>
                  {this.is_authenticated() ? <Nav.Link as={NavLink} to="/auth">LogIn</Nav.Link> : <Nav.Link as={NavLink} to="/auth" onClick={() => this.logout()}>LogOut</Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container fluid='md' className="content" style={{ padding: '0' }}>
            <Routes>
              <Route path='/' element={
                this.is_authenticated() ? <NotFound404 /> : <Users get_headers={() => this.get_headers()} />
              } />
              <Route path='/projects' element={
                this.is_authenticated() ? <NotFound404 /> : <Projects deleteItem={(url, headers) => this.deleteItem(url, headers)} get_headers={() => this.get_headers()} />
              } />
              <Route path='/todos' element={
                this.is_authenticated() ? <NotFound404 /> : <Todos deleteItem={(url, headers) => this.deleteItem(url, headers)} get_headers={() => this.get_headers()} />
              } />
              <Route path='/projects/:pk' element={
                this.is_authenticated() ? <NotFound404 /> : <ProjectDetail get_headers={() => this.get_headers()} />
              } />
              <Route exact path='/auth' element={
                this.is_authenticated() ? <LoginForm get_token={(username, password) => this.get_token(username, password)} /> : <h1>Вы вошли!</h1>
              } />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    )
  }

}


const NotFound404 = () => {
  return (
    <div>
      <h1>Страница не найдена</h1>
    </div>
  )
}


export default App;
