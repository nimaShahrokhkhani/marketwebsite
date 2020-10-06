import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n'
import * as serviceWorker from './serviceWorker';

import App from './App';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>,
    document.getElementById('root')
);
serviceWorker.unregister();
