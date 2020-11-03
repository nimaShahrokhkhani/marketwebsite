import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import PanelManagement from "./PanelManagement/PanelManagement";
import Login from "./Login/Login";
import Market from "./market/Market";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Market} />
                    <Route path="/login" exact component={Login} />
                        <Route path="/PanelManagement" component={PanelManagement} />
                </Switch>
            </Router>
        )
    }
}
