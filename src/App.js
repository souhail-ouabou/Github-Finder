import React from 'react';
import './App.css';
import Navbar from './Components/layout/Navbar';
import Alert from './Components/layout/Alert';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import About from './Components/Pages/About';
import User from './Components/users/User';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';
const App = () => {
    return (
      <GithubState>
        <AlertState>
    <Router>
    <div className="App">
        <Navbar />
        <div className="container">
          <Alert/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/About' component={About}/>
            <Route exact path='/user/:login' component={User}/>
            <Route  component={NotFound}/>
          </Switch>
        </div>
    </div>
    </Router>    
    </AlertState>
      </GithubState>
  ); 
}
export default App;
