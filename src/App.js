import React, {Component, Fragment} from 'react';
import './App.css';
import Navbar from './Components/layout/Navbar';
import Users from './Components/users/Users';
import axios from 'axios';
import Search from './Components/users/Search';
import Alert from './Components/layout/Alert';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import About from './Components/Pages/About';
import User from './Components/users/User';
class App extends Component{
  state={
    users: [],
    user: {},
    repos: [], 
    loading : false,
    alert :null
  };
/*
  async componentDidMount(){
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrets={REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({loading: false, users: res.data});
  }
*/
  //Search github users 
  searchusers = async text => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrets={REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, users: res.data.items});
  }
  //Get signle github user
  getUser = async username => {
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrets={REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, user: res.data});
  }
  //Get  user repos
  getUserRepos = async username => {
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrets={REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, repos: res.data});
  }
   //Clear users from state
  clearusers = () => this.setState({users: [], loading : false})
  
  //setAlert
  setalert =(msg,type)=> {
    this.setState({alert : {msg,type}})
   setTimeout(() => this.setState({alert: null}),5000)
  };

  render(){
    const  {loading,users,user,repos} = this.state
    return (
    <Router>
    <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                 searchUsers={this.searchusers}
                 clearUsers={this.clearusers}
                 showClear={users.length > 0 ? true : false} 
                 setAlert={this.setalert}
                 />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/About' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser}  getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading}/>
            )}/>
          </Switch>
        </div>
    </div>
    </Router>
  ); 
  }

}

export default App;
