import React from 'react';
import './App.css';
import { Router,Route } from "react-router-dom";
import history from './config/history'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

export default class App extends React.Component{
  render(){
    return(
      <Router history={history}>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/signUp" component={SignUp}/>
      </Router>
    )
  }
  
}
