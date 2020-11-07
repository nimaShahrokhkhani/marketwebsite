import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {withTranslation, Trans} from 'react-i18next'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const pathname = this.props.location.pathname;
        const {t} = this.props;
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href="#home">
                    <img
                        src={require("../image/hamburgerMenu.jpeg")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link fill={true} href="/Market" active={pathname.endsWith('/Market')} >{t('navBar.home')}</Nav.Link>
                        <Nav.Link fill={true} href="/Market/Products" active={pathname.startsWith('/Market/Products')}>{t('navBar.shop')}</Nav.Link>
                        <Nav.Link fill={true} href="/">{t('navBar.events')}</Nav.Link>
                        <Nav.Link fill={true} href="/">{t('navBar.articles')}</Nav.Link>
                        <Nav.Link fill={true} href="/">{t('navBar.proCard')}</Nav.Link>
                        <Nav.Link fill={true} href="/">{t('navBar.ourStory')}</Nav.Link>
                        <Nav.Link fill={true} href="/">{t('navBar.contact')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withTranslation()(withRouter(Navigation));
