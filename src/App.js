import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/layout/Navbar';
import Users from './Components/users/Users';
import axios from 'axios';
class App extends Component{
  state={
    users: [],
    loading : false
  };

  async componentDidMount(){
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrets={REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({loading: false, users: res.data});
  }
  render(){
     return (
    <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
        
    
    </div>
  ); 
  }

}

export default App;
