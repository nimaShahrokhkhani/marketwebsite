import * as React from "react";
import {Modal, Button} from 'react-bootstrap';
import '../../Market.css';
import './LoginModal.css';
import '../../style/reset.css';
import Services from "../../../utils/Services";

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            username: '',
            password: '',
            isRegister: false,
            registerUsername: '',
            registerPassword: '',
            registerEmail: '',
            registerPhoneNumber: '',
            registerBirthday: '',
            registerAddress: '',
        }
    }

    onChangeUsernameInput = (evt) => {
        this.setState({
            username: evt.target.value
        });
    };

    onChangePasswordInput = (evt) => {
        this.setState({
            password: evt.target.value
        });
    };

    submitLogin = (e) => {
        e.preventDefault();
        Services.signIn({username: this.state.username, password: this.state.password}).then((res) => {
            console.log('loginnnnnnnn', res);
            this.props.onSuccessLogin(res.data);
        }).catch((error) => {
            console.log('loginnnnnnnn errorrrrrr', error);
            this.props.onErrorLogin(error);
        })
    };

    registerUser = (e) => {
        e.preventDefault();
        this.setState({
            isRegister: true
        })
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    signUp = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', this.state.registerUsername);
        data.append('password', this.state.registerPassword);
        data.append('email', this.state.registerEmail);
        data.append('phoneNumber', this.state.registerPhoneNumber);
        data.append('birthday', this.state.registerBirthday);
        data.append('address', this.state.registerAddress);
        Services.insertUser(data).then((response) => {
            this.setState({
                modalShow: false,
                username: '',
                password: '',
                isRegister: false,
                registerUsername: '',
                registerPassword: '',
                registerEmail: '',
                registerPhoneNumber: '',
                registerBirthday: '',
                registerAddress: ''
            }, () => {
                this.props.onHide();
            })
        }).catch((error) => {
            console.log(error)
        });
    };

    close = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body>

                    <div className="modalContainer">

                        <div className="modal-login">
                            <div className="modal-logo">
                                <img src={require("../../image/modal-logo.jpg")} alt="Logo"/>
                            </div>
                            <div className="modalContent">
                                {!this.state.isRegister ?
                                    <div className="modalBody">

                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="username"
                                                       placeholder="                               نام کاربری"
                                                       required="required"
                                                       value={this.state.username}
                                                       onChange={this.onChangeUsernameInput}/>
                                                <img src={require("../../image/message-icon-000000-33.jpg")}
                                                     style={{float: "right"}}/>

                                            </div>
                                        </div>
                                        < div className="form-group">
                                            <div className="input-group">
                                                <input type="password" className="form-control" name="password"
                                                       placeholder="                                رمز عبور"
                                                       required="required"
                                                       value={this.state.password}
                                                       onChange={this.onChangePasswordInput}/>
                                                <img src={require("../../image/lock-32.jpg")} style={{float: "right"}}/>

                                            </div>
                                            <div className="remember"><input type="checkbox" value="chk"
                                                                             style={{float: "inherit"}}/>مرا به خاطر
                                                بسپار
                                            </div>

                                        </div>
                                        <div className="forget-psw">
                                            <a href="#">
                                                !رمز خود را فراموش کرده ام
                                            </a>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block btn-lg"
                                                    onClick={this.submitLogin}>ورود
                                            </button>
                                            <button type="submit"
                                                    className="register-button btn-primary btn-block btn-lg"
                                                    onClick={this.registerUser}>ثبت نام
                                            </button>
                                        </div>

                                    </div> :
                                    <div className="modalBody">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="registerUsername"
                                                       placeholder="                               نام کاربری"
                                                       required="required"
                                                       value={this.state.registerUsername}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="password" className="form-control" name="registerPassword"
                                                       placeholder="                               رمز عبور"
                                                       required="required"
                                                       value={this.state.registerPassword}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="email" className="form-control" name="registerEmail"
                                                       placeholder="                               ایمیل"
                                                       required="required"
                                                       value={this.state.registerEmail}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="number" className="form-control" name="registerPhoneNumber"
                                                       placeholder="                               شماره تلفن"
                                                       required="required"
                                                       value={this.state.registerPhoneNumber}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="date" className="form-control" name="registerBirthday"
                                                       placeholder="                               تاریخ تولد"
                                                       required="required"
                                                       value={this.state.registerBirthday}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="registerAddress"
                                                       placeholder="                               آدرس"
                                                       required="required"
                                                       value={this.state.registerAddress}
                                                       onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block btn-lg"
                                                    onClick={this.signUp}>ثبت نام
                                            </button>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;
