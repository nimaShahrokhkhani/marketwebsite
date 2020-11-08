import React from 'react';
import './Market.css';
import './style/reset.css';
import './style/footer.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import {withTranslation, Trans} from 'react-i18next'
import {NavDropdown} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBox from '../components/searchBar/SearchBox'
import makeExpanding from '../components/searchBar/expanding-animation';
import LoginModal from './components/Modal/LoginModal'
import {connect} from "react-redux";
import {setUser, setState} from "../components/redux/actions";
import Services from "../utils/Services";

const ExpandingSearchBox = makeExpanding(SearchBox);

class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            value: "fa",
            changeLanguageMenuActive: false,
            userInfoModal: false,
            query: ''
        }
    }

    componentDidMount() {
        this.props.setState(JSON.parse(localStorage.getItem('state')));
    }

    onLanguageHandle = (newLang) => {
        this.setState({value: newLang});
        this.props.i18n.changeLanguage(newLang)
    };

    onShoppingCartClick = () => {
        this.props.history.push({
            pathname: '/Market/ShoppingCart'
        });
    };

    getShoppingCartProductsLength() {
        let totalCount = 0;
        this.props.products && this.props.products.length > 0 && this.props.products.map(product => {
            totalCount += product.count;
        });
        return totalCount;
    }

    signOut = () => {
        this.props.setUser({});
        this.setState({
            userInfoModal: false
        })
    };

    onQueryUpdate = (query) => {
        this.setState({
            query
        })
    };

    onSubmitSearch = () => {
        Services.searchProductsList({name: this.state.query}).then((response) => {
            this.props.history.push({
                pathname: '/Market/Products',
                state: {
                    products: response.data,
                    isFromSearch: true
                }
            });
        })
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
                            <div style={{display: 'flex', height: 30, marginRight: 30}}>
                                <a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                   onClick={this.onShoppingCartClick}><img
                                    style={{width: 30, height: 30, marginLeft: 10}}
                                    src={require("./image/shopping-cart.png")}
                                    alt="shopping-cart"/></a>
                                <p className='products-count'>{this.getShoppingCartProductsLength()}</p>
                            </div>

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
                                        <ExpandingSearchBox
                                            onQueryUpdate={this.onQueryUpdate}
                                            query={this.state.query}
                                            onSubmit={this.onSubmitSearch}/>
                                    </div>
                                </MuiThemeProvider>
                            </a>
                            </div>
                            <div className="user-info">
                                <div style={{height: 20}}><a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                                             onClick={
                                                                 () => (!this.props.user || !this.props.user.username) ? this.setState({
                                                                     modalShow: !this.state.modalShow,
                                                                     userInfoModal: false
                                                                 }) : this.setState({
                                                                     modalShow: false,
                                                                     userInfoModal: !this.state.userInfoModal
                                                                 })}>
                                    <p style={{
                                        color: 'black',
                                        fontSize: 15
                                    }}>{(this.props.user && this.props.user.username) ? this.props.user.username : t('topBar.userLogin')}</p>
                                    <img style={{width: 20, height: 20, marginLeft: 10}}
                                         src={require("./image/user.png")}
                                         alt="Profile"/></a>
                                </div>
                                {this.renderUserInfo()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    renderUserInfo() {
        if (this.state.userInfoModal) {
            return (
                <div className='user-info-container'>
                    <div>
                        <section className="user-info-image"/>
                        <p id="user-username">Mohamad Reaza</p>
                        <p id="user-email">nima.shahrokhkhani@gmail.com</p>
                        <section className="user-info-button-container">
                            <a onClick={this.signOut} className="user-info-button">
                                <p>
                                    خروج از حساب کاربری
                                </p>
                            </a>
                            <a className="user-info-button">
                                <p>مدیریت حساب کاربری</p>
                            </a>
                        </section>
                    </div>
                </div>
            )
        }
    }

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


                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a
                            href="#">{t('footer.cinematicSales')}</a></li>
                        <br/>
                        <li><img src={require("./image/teleph.jpg")} alt="Phone"/><a
                            href="#"> {t('footer.grantingRepresentation')}</a></li>
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
        this.props.setUser(user);
        this.setState({
            modalShow: false
        })
    };

    onErrorLogin = (error) => {
        console.log('userrrrrrrrr:', error)
    };

    render() {
        return (
            <div className="App">
                <div className="top-content">
                    {this.renderTopBar()}
                    <Navigation/>
                </div>
                <Routes/>
                <LoginModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({
                        modalShow: false
                    })}
                    onSuccessLogin={this.onSuccessLogin}
                    onErrorLogin={this.onErrorLogin}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.user;
    const products = state.products;
    return {user, products};
}

export default connect(mapStateToProps, {setUser, setState})(withTranslation()(Market));
