import React from 'react';
import './Market.css';
import './style/reset.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation, Trans } from 'react-i18next'
import { NavDropdown } from 'react-bootstrap';

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

    // renderTopBar = () => {
    //     return(
    //         <div id="header-main">
    //
    //             <div id="main">
    //                 <div className="top-bar">
    //                     <div className="action-top-bar-right">
    //                         <ul>
    //                             <li><a href="#" onClick={() => this.setState({
    //                                 modalShow: true
    //                             })}><img src={require("./image/user.jpg")} alt="Profile"/></a></li>
    //                             <li><a href="#"><img src={require("./image/shop.jpg")} alt="Shoping"/></a></li>
    //
    //
    //                         </ul>
    //
    //                     </div>
    //                     <div className="action-top-bar-left">
    //                         <ul>
    //                             <li><a href="#" onClick={() => this.onLanguageHandle(this.state.value === 'fa' ? 'en' : 'fa')}><img src={require("./image/lang.jpg")} alt="World"/></a></li>
    //                             <li><a href="#"><img src={require("./image/search.jpg")} alt="Search"/></a></li>
    //
    //                         </ul>
    //
    //                     </div>
    //                     <div className="logo">
    //                         <a href="#"><img src={require("./image/logo.jpg")} alt="Logo"/></a>
    //                     </div>
    //                 </div>
    //
    //             </div>
    //         </div>
    //     );
    // };

    renderTopBar = () => {
        const {t} = this.props;
        return(
            <div id="header-main">

                <div id="main">
                    <div className="top-bar">
                        <div className="top-start-bar">
                                <div style={{height: 20}}><a style={{alignItems: 'flex-end', display: 'flex'}} href="#" onClick={() => this.setState({
                                    modalShow: true
                                })}>
                                    <p style={{color: 'black', fontSize: 15}}>{t('topBar.userLogin')}</p>
                                    <img style={{width:20, height: 20, marginLeft: 10}} src={require("./image/user.png")} alt="Profile"/></a>
                                </div>
                               <div style={{height: 20, marginLeft: 30}}><a style={{alignItems: 'flex-end', display: 'flex'}} href="#">
                                   <p style={{color: 'black', fontSize: 15}}>{t('topBar.search')}</p>
                                   <img style={{width:20, height: 20, marginLeft: 10}} src={require("./image/search.png")} alt="Search"/></a>
                               </div>
                        </div>
                        <div className="top-end-bar">
                            <div style={{display: 'flex', height: 30}}>
                                <a style={{alignItems: 'flex-end', display: 'flex'}} href="#" onClick={() => this.onLanguageHandle(this.state.value === 'fa' ? 'en' : 'fa')}><img style={{width:30, height: 30, marginLeft: 10}} src={require("./image/lang.png")} alt="World"/></a>
                                <NavDropdown title="" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="App">
                {this.renderTopBar()}
                <Navigation/>
                <Routes />
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({
                        modalShow: false
                    })}
                />
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withTranslation()(Market);
