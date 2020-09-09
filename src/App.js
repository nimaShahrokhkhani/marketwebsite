import React from 'react';
import logo from './background.jpg';
import './App.css';
import axios from './utils/axios';

class App extends React.Component{

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
                alert((res.data.username))
                this.props.history.push('/panelManagement/PanelManagement')
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
                    <img src={require('./background.jpg')} width="100%" height="100%"/>
                </div>
            </div>
        );
    }
}

export default App;
