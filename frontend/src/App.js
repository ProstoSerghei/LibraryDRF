import './App.css';
import React from 'react'
import UsersList from './components/Users.js'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="info">
        <UsersList users={this.state.users} />
      </div>
    )
  }

}



export default App;
