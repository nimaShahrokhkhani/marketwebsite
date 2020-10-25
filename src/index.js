import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {I18nextProvider} from 'react-i18next';
import i18n from './components/i18n'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./components/redux/store";

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
