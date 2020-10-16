import React from 'react';
import './Market.css';
import './style/reset.css';
import './style/footer.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import {Modal, Button} from 'react-bootstrap';
import {withTranslation, Trans} from 'react-i18next'
import {NavDropdown} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBox from '../components/searchBar/SearchBox'
import makeExpanding from '../components/searchBar/expanding-animation';

const ExpandingSearchBox = makeExpanding(SearchBox);

class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            value: "fa"
        }
    }

    onLanguageHandle = (newLang) => {
        this.setState({value: newLang});
        this.props.i18n.changeLanguage(newLang)
    };

    renderTopBar = () => {
        const {t} = this.props;
        const style = {
            top: '50%',
            left: '50%',
            transform: 'translate(0%, -50%)',
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: 'center',
            paddingBottom: 10
        };
        return (
            <div id="header-main">

                <div id="main">
                    <div className="top-bar">
                        <div className="top-start-bar">
                            <div style={{height: 20}}><a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                                         onClick={() => this.setState({
                                                             modalShow: true
                                                         })}>
                                <p style={{color: 'black', fontSize: 15}}>{t('topBar.userLogin')}</p>
                                <img style={{width: 20, height: 20, marginLeft: 10}} src={require("./image/user.png")}
                                     alt="Profile"/></a>
                            </div>
                            <div style={{height: 20, marginLeft: 30}}><a
                                style={{alignItems: 'flex-end', display: 'flex'}} href="#">
                                <MuiThemeProvider>
                                    <div style={style}>
                                        <p style={{color: 'black', fontSize: 15}}>{t('topBar.search')}</p>
                                        <ExpandingSearchBox/>
                                    </div>
                                </MuiThemeProvider>
                            </a>
                            </div>
                        </div>
                        <div className="top-end-bar">
                            <div style={{display: 'flex', height: 30}}>
                                <a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                   onClick={() => this.onLanguageHandle(this.state.value === 'fa' ? 'en' : 'fa')}><img
                                    style={{width: 30, height: 30, marginLeft: 10}} src={require("./image/lang.png")}
                                    alt="World"/></a>
                                <NavDropdown title="" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    renderFooter() {
        return (
            <footer class="flex-rw">
                <div class="brand">
                    <img src={require("./image/logo.jpg")} alt="Logo"/>
                </div>

                <ul class="footer-list-top">

                    <ul class="footer-list-top1">

                        <h4 class="footer-list-header1">معرفی گریماس</h4>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> درباره ما</a>
                        </li>
                        <br/>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> پرسش و پاسخ</a>
                        </li>
                        <br/>
                        <li><img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> مراکز مجاز فروش</a>
                        </li>
                        <br/>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> گروه آموزش گریماس </a>
                        </li>

                    </ul>
                </ul>
                <ul class="footer-list-top">
                    <ul class="footer-list-top2">
                        <li>
                            <h4 class="footer-list-header2">تماس با ما</h4></li>


                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a href="#"> فروش سینمایی:09124959391</a></li>
                        <br/>
                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a href="#"> اعطا نمایندگی:09126954939</a></li>
                        <br/>
                        <li><img src={require("./image/email.jpg")} alt="Email"/><a href="#"> info@Grimas.ir</a></li>

                    </ul>
                </ul>
                <ul class="footer-list-top">
                    <ul class="footer-list-top3">
                        <li>
                            <h4 class="footer-list-header3">آخرین نظرات</h4></li>
                        <li>آموزش استفاده از میک آپ</li>
                        <br/>
                        <li>ترند ارایشی سال 2020</li>
                        <br/>
                        <li>مدیر در کرم پودر در شرکت گریماس چه نام دارد؟</li>
                        <br/>
                        <li>مدیر در آموزش استفاده از کارکشن گریماس؟</li>
                        <br/>
                        <li>چگونه به بهترین پوست در بعد زایمان برسیم</li>
                        <br/>
                        <li>بهترین برند لوازم آرایشی در سال 2020 ؟</li>

                    </ul>
                </ul>
                <div class="footer-social">
                    <ul>
                        <li><a href="#"><img src={require("./image/face.jpg")} alt="Facebook"/></a>
                            <a href="#"><img src={require("./image/insta.jpg")} alt="Instagram"/></a>
                            <a href="#"><img src={require("./image/teleg.jpg")} alt="Telegram"/></a>
                            <a href="#"><img src={require("./image/youtube.jpg")} alt="Youtube"/></a></li>
                    </ul>
                </div>


                <div class="footer-bottom"> کلیه حقوق و معنوی این سایت محفوظ می باشد</div>

                <div class="searchBox">

                    <input class="searchInput" type="text" name="" placeholder="ایمیل خود را وارد کنید......"/>

                    <button class="searchButton" href="#">

                        <i class="material-icons">
                            <img src={require("./image/email2.jpg")}/>
                        </i>
                    </button>

                </div>

            </footer>
        )
    }

    render() {
        return (
            <div className="App">
                {this.renderTopBar()}
                <Navigation/>
                <Routes/>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({
                        modalShow: false
                    })}
                />
                {this.renderFooter()}
            </div>
        );
    }
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <div id="myModal" className="modal fade">
                    <div className="modal-dialog modal-login">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="avatar">
                                    <img src="/examples/images/avatar.png" alt="Avatar"/>
                                </div>
                                <h4 className="modal-title">Member Login</h4>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form action="/examples/actions/confirmation.php" method="post">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username"
                                               placeholder="Username" required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Password" required="required"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                                className="btn btn-primary btn-lg btn-block login-btn">Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default withTranslation()(Market);
