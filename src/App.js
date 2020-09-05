import React from 'react';
import logo from './background.jpg';
import './App.css';
import axios from './utils/axios';

class App extends React.Component{

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        axios.get(`/login` , {})
            .then(res =>{
                alert('hi')
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
                                <input type="text" placeholder="Username" required="" id="username"/>
                            </div>
                            <div>
                                <input type="password" placeholder="Password" required="" id="password"/>
                            </div>
                            <div>
                                <button onClick={this.login} >login

                                </button>
                                <a href="#">Lost your password?</a>
                                <a href="#">Register</a>
                            </div>
                        </form>

                    </section>
                </div>
                <div className="imageBackground">
                    <img src={require('./background.jpg')} width="100%" height="100%"/>
                </div>
            </div>
        );
    }
}

export default App;
