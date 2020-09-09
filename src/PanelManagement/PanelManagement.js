import React from 'react';
import './PanelManagement.css';
import Navigation from './components/Navbar';
import Routes from './Routes';

function PanelManagement() {
    return (
        <div className="App">
            <Navigation/>
            <Routes />
        </div>
    );
}

export default PanelManagement;
