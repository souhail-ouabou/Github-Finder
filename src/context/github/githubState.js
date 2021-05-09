import React, {useReducer} from 'react';
import axios from 'axios';
import GithubReducer from './githubReducer'
import GithubContext from './githubContext';
import {
    SEARCH_USERS,
    GET_USER ,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING 
} from '../types'
let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState ={
        users: [],
        user:{},
        repos: [],
        loading: false
    }
    const [state,dispatch] = useReducer(GithubReducer,initialState)
    //Search users
    const searchUsers = async text => {
        setLoading() //true
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secrets=${githubClientSecret}`);
        dispatch({type:SEARCH_USERS , payload : res.data.items})
      } 
  //Get signle github user
   const getUser = async username => {
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secrets=${githubClientSecret}`);
    
    dispatch({type:GET_USER , payload : res.data})
  
  }
      //Get  user repos
  const getUserRepos = async username => {
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=created:asc&client_id=${githubClientId}&client_secrets=${githubClientSecret}`);
    dispatch({type:GET_REPOS , payload : res.data})
  }

      //Clear users from state
   const clearUsers = () => dispatch({type: CLEAR_USERS})
    

    //set Loading //action define the type and the reducer catch it
      const setLoading = () => dispatch({type: SET_LOADING});
    return <GithubContext.Provider
    value={{
        users: state.users,
        user : state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </GithubContext.Provider>

}
export default GithubState