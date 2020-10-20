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
import LoginModal from './components/Modal/LoginModal'

const ExpandingSearchBox = makeExpanding(SearchBox);

class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            value: "fa",
            changeLanguageMenuActive: false
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
                            <div style={{display: 'flex', height: 30}}>
                                <a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                   onClick={() => this.setState({changeLanguageMenuActive: !this.state.changeLanguageMenuActive})}><img
                                    style={{width: 30, height: 30, marginLeft: 10}} src={require("./image/lang.png")}
                                    alt="World"/></a>
                                <NavDropdown disabled={this.state.changeLanguageMenuActive} title=""
                                             id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => this.onLanguageHandle('fa')}
                                                      href="#action/3.1">fa</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.onLanguageHandle('en')}
                                                      href="#action/3.2">en</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                        <div className="top-end-bar">
                            <div style={{height: 20, marginRight: 30}}><a
                                style={{alignItems: 'flex-end', display: 'flex'}} href="#">
                                <MuiThemeProvider>
                                    <div style={style}>
                                        <p style={{color: 'black', fontSize: 15}}>{t('topBar.search')}</p>
                                        <ExpandingSearchBox/>
                                    </div>
                                </MuiThemeProvider>
                            </a>
                            </div>
                            <div style={{height: 20}}><a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                                         onClick={() => this.setState({
                                                             modalShow: true
                                                         })}>
                                <p style={{color: 'black', fontSize: 15}}>{t('topBar.userLogin')}</p>
                                <img style={{width: 20, height: 20, marginLeft: 10}} src={require("./image/user.png")}
                                     alt="Profile"/></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    renderFooter() {
        const {t} = this.props;
        return (
            <footer class="flex-rw">
                <div class="brand">
                    <img src={require("./image/logo.jpg")} alt="Logo"/>
                </div>

                <ul class="footer-list-top">

                    <ul class="footer-list-top1">

                        <h4 class="footer-list-header1">{t('footer.introduce')}</h4>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> {t('footer.aboutUs')}</a>
                        </li>
                        <br/>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> {t('footer.qa')}</a>
                        </li>
                        <br/>
                        <li><img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#">{t('footer.authorizedSalescenters')}</a>
                        </li>
                        <br/>
                        <li>
                            <img src={require("./image/Capture.jpg")} alt="point"/>
                            <a href="#"> {t('footer.grimasTrainingGroup')} </a>
                        </li>

                    </ul>
                </ul>
                <ul class="footer-list-top">
                    <ul class="footer-list-top2">
                        <li>
                            <h4 class="footer-list-header2">{t('footer.contactWithUs')}</h4></li>


                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a href="#">{t('footer.cinematicSales')}</a></li>
                        <br/>
                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a href="#"> {t('footer.grantingRepresentation')}</a></li>
                        <br/>
                        <li><img src={require("./image/email.jpg")} alt="Email"/><a href="#"> info@Grimas.ir</a></li>

                    </ul>
                </ul>
                <ul class="footer-list-top">
                    <ul class="footer-list-top3">
                        <li>
                            <h4 class="footer-list-header3">{t('footer.lastComments')}</h4></li>
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

    onSuccessLogin = (user) => {
        console.log('userrrrrrrrr:', user)
    };

    onErrorLogin = (error) => {
        console.log('userrrrrrrrr:', error)
    };

    render() {
        return (
            <div className="App">
                {this.renderTopBar()}
                <Navigation/>
                <Routes/>
                <LoginModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({
                        modalShow: false
                    })}
                    onSuccessLogin={this.onSuccessLogin}
                    onErrorLogin={this.onErrorLogin}
                />
                {this.renderFooter()}
            </div>
        );
    }
}

export default withTranslation()(Market);
