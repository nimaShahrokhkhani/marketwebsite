/*
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <p>A simple app showing react button click navigation</p>
          <form>
            <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button>
          </form>
        </div>
      </div>
    );
  }
}
*/
import React from 'react';
import './Login.css';
import axios from '../utils/axios';
import history from './../history';

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

  }
  onChangeUsername(event){
    this.setState({username: event.target.value});
  }
  onChangePassword(event){
    this.setState({password: event.target.value});
  }

  login() {
    axios.post(`/login` , {
      username:this.state.username,
      password:this.state.password,
    })
        .then(res =>{
          history.push('/PanelManagement')
        }).catch(error => alert(JSON.stringify(error)))
  }

  render() {
    return (
        <div className="container">
          <div className="loginForm">
            <section id="content">
              <form action="">
                <h1>Login Form</h1>
                <div>
                  <input type="text" placeholder="Username" required="" id="username" value={this.state.username} onChange={this.onChangeUsername}/>
                </div>
                <div>
                  <input type="password" placeholder="Password" required="" id="password" value={this.state.password} onChange={this.onChangePassword}/>
                </div>
                <div>
                  <button onClick={this.login} type="button" >login

                  </button>

                  <a href="#">Lost your password?</a>
                  <a href="#">Register</a>
                </div>
              </form>

            </section>
          </div>
          <div className="imageBackground">
            <img src={require('../background.jpg')} width="100%" height="100%"/>
          </div>
        </div>
    );
  }
}

export default Login;
