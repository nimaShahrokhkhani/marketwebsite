import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Users from "./Users/Users";
import Companies from "./Companies/Companies";
import Products from "./Products/Products";
import history from '../history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/PanelManagement" exact component={Users} />
                    <Route path="/PanelManagement/Companies" component={Companies} />
                    <Route path="/PanelManagement/Products" component={Products} />
                </Switch>
            </Router>
        )
    }
}
