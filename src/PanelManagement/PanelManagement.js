import React from 'react';
import './PanelManagement.css';
import Navigation from './components/Navbar';
import Routes from './Routes';

function PanelManagement() {
    return (
        <div className="App">
            <div className='top-content'>
                <Navigation/>
            </div>
            <Routes/>
        </div>
    );
}

export default PanelManagement;
