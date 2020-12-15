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

    onAccountInfoBtnClick = () => {
        this.props.history.push({
            pathname: '/Market/AccountInfo'
        });
    }

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
                                    src={require("../market/image/shopping-cart.png")}
                                    alt="shopping-cart"/></a>
                                <p className='products-count'>{this.getShoppingCartProductsLength()}</p>
                            </div>

                            <div style={{display: 'flex', height: 30}}>
                                <a style={{alignItems: 'flex-end', display: 'flex'}} href="#"
                                   onClick={() => this.setState({changeLanguageMenuActive: !this.state.changeLanguageMenuActive})}><img
                                    style={{width: 30, height: 30, marginLeft: 25}} src={require("../market/image/world-lan1.png")}
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
                                         src={require("../market/image/user.png")}
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
                            <a onClick={this.onAccountInfoBtnClick} className="user-info-button">
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
            <footer>
                <div id="footer11">
                    <div id="Group_377">
                        <svg className="Path_556" viewBox="-48.339 -12.608 469.056 917.597">
                            <path id="Path_556"
                                  d="M 420.7168579101562 179.0343475341797 L 289.4585876464844 -12.60771179199219 L -48.33911514282227 772.6537475585938 L 27.98006439208984 904.9890747070312 L 420.7168579101562 179.0343475341797 Z">
                            </path>
                        </svg>
                        <div id="Group_311">
                            <div id="Group_288">
                                <svg className="Path_221" viewBox="-20.46 -17.094 479.11 674.538">
                                    <path id="Path_221"
                                          d="M -18.01109504699707 657.4430541992188 L 458.649658203125 310.2049865722656 L 392.4698486328125 -17.0944881439209 L -20.46020698547363 327.0364990234375 L -18.01109504699707 657.4430541992188 Z">
                                    </path>
                                </svg>
                            </div>
                            <div id="Group_299">
                                <img id="Rectangle_6099" src="Rectangle_609.png/"
                                     srcSet="Rectangle_609.png 1x, Rectangle_609@2x.png 2x"/>
                            </div>
                        </div>
                        <svg className="Path_667" viewBox="-20.46 -17.094 479.11 674.538">
                            <path id="Path_667"
                                  d="M -18.01109504699707 657.4430541992188 L 458.649658203125 310.2049865722656 L 392.4698486328125 -17.0944881439209 L -20.46020698547363 327.0364990234375 L -18.01109504699707 657.4430541992188 Z">
                            </path>
                        </svg>
                    </div>
                    <svg className="Path_777" viewBox="0 0 317.302 156.288">
                        <path id="Path_777"
                              d="M 10.81177806854248 156.2881164550781 L 317.3016967773438 7.62939453125e-06 L 0 41.3046875 L 10.81177806854248 156.2881164550781 Z">
                        </path>
                    </svg>
                    <div id="Group_388">
                        <svg className="Path_555_q" viewBox="10.818 5.336 504.027 969.101">
                            <path id="Path_555_q"
                                  d="M 514.8448486328125 207.3044738769531 L 374.6290283203125 5.336058616638184 L 10.81780052185059 834.9383544921875 L 92.29682159423828 974.4375 L 514.8448486328125 207.3044738769531 Z">
                            </path>
                        </svg>
                        <div id="Group_311_r">
                            <div id="Group_288_s">
                                <svg className="Path_222_t" viewBox="0 0 570.937 687.278">
                                    <path id="Path_222_t"
                                          d="M 0 687.2783203125 L 570.9365844726562 326.7905883789062 L 501.135986328125 0 L 5.442733764648438 355.7625732421875 L 0 687.2783203125 Z">
                                    </path>
                                </svg>
                            </div>
                            <div id="Group_299_u">
                                <img id="Rectangle_609_v" src="Rectangle_609_v.png"
                                     srcSet="Rectangle_609_v.png 1x, Rectangle_609_v@2x.png 2x"/>
                            </div>
                        </div>
                        <svg className="Path_666_w" viewBox="9.337 6.808 510.85 679.158">
                            <path id="Path_666_w"
                                  d="M 9.336938858032227 685.966064453125 L 520.1865844726562 333.9230346679688 L 452.6936645507812 6.808124542236328 L 9.749782562255859 355.1572570800781 L 9.336938858032227 685.966064453125 Z">
                            </path>
                        </svg>
                    </div>
                    <svg className="Path_888" viewBox="0 0 317.302 156.288">
                        <path id="Path_888"
                              d="M 10.81177806854248 156.2881164550781 L 317.3016967773438 7.62939453125e-06 L 0 41.3046875 L 10.81177806854248 156.2881164550781 Z">
                        </path>
                    </svg>
                    <svg className="Rectangle_623">
                        <rect id="Rectangle_623" rx="0" ry="0" x="0" y="0" width="1096" height="397">
                        </rect>
                    </svg>
                    <div id="intro">
                        <span>معرفی گریماس</span>
                    </div>
                    <div id="Group_182">
                        <div id="_____________">
                            <span><img src={require("../market/image/circle-8.png")}/> درباره ما<br/><br/><img
                                src={require("../market/image/circle-8.png")}/>پرسش و پاسخ<br/><br/><img src={require("../market/image/circle-8.png")} />  مراکز مجاز فروش<br/><br/>
                                <img src={require("../market/image/circle-8.png")}/>گروه آموزش گریماس</span>
                        </div>

                    </div>
                    <div id="_4959391-0912___6954939-0912__">
		<span><img src={require("../market/image/phone-28-16.png")}/>فروش سینمایی:4959391-0912&nbsp;<br/><br/>
            <img src={require("../market/image/phone-28-16.png")}/>اعطای نمایندگی:6954939-0912<br/></span><br/>
                        <span><img src={require("../market/image/email-3-16.png")}/>info@Grimas.ir&nbsp;</span>
                    </div>


                    <div id="______1126__mona______2020_RAH">
                        <span>در آموزش استفاده از کیک میکاپ 1126 گریماس mona<br/><br/>در ترند آرایشی سال 2020 RAHA<br/><br/>مدیر در کرم پودر در کمپانی گریماس چه نام دارد؟<br/><br/>در کرم پودر در کمپانی چه نام دارد؟Rahil<br/><br/>مدیر در آموزش استفاده کارکشن گریماس</span>
                    </div>
                    <div id="__bs">
                        <span>آخرین نظرات</span>
                    </div>
                    <div id="-us-">
                        <span>تماس با ما</span>
                    </div>

                    <div id="Group_188">
                        <div id="___">
                            <span>فرم تماس با ما</span>
                        </div>

                    </div>
                    <div className="icons">
                        <img src={require("../market/image/facebook-3-32.png")}/>&nbsp;
                        <img src={require("../market/image/instagram-3-32.png")}/>&nbsp;
                        <img src={require("../market/image/youtube-3-32.png")}/>&nbsp;
                        <img src={require("../market/image/twitter-3-32.png")}/>
                    </div>


                    <div className="wrap">
                        <div className="search">
                            <input type="text" className="searchTerm" placeholder="لطفا ایمیل خود را وارد کنید."/>
                                <button type="submit" className="searchButtonFooter">
                                    <i className="fa fa-search"><img src={require("../market/image/email-24.png")}/></i>
                                </button>
                        </div>
                    </div>


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
                {this.renderFooter()}
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
