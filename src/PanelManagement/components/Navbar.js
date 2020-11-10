import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
    const pathname = props.location.pathname;
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/PanelManagement" active={pathname.endsWith('/PanelManagement')}>Users</Nav.Link>
                    <Nav.Link href="/PanelManagement/Companies" active={pathname.startsWith('/PanelManagement/Companies')}>Companies</Nav.Link>
                    <Nav.Link href="/PanelManagement/ProductCategories" active={pathname.startsWith('/PanelManagement/ProductCategories')}>Product Categories</Nav.Link>
                    <Nav.Link href="/PanelManagement/Products" active={pathname.startsWith('/PanelManagement/Products')}>Products</Nav.Link>
                    <Nav.Link href="/PanelManagement/Highlights" active={pathname.startsWith('/PanelManagement/Highlights')}>Highlights</Nav.Link>
                    <Nav.Link href="/PanelManagement/EventsManager" active={pathname.startsWith('/PanelManagement/EventsManager')}>EventsManager</Nav.Link>
                    <Nav.Link href="/PanelManagement/BrandManager" active={pathname.startsWith('/PanelManagement/BrandManager')}>BrandManager</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Navigation);
