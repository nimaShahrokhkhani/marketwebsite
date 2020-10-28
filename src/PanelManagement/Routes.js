import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Users from "./Users/UsersManager";
import Companies from "./Companies/CompaniesScreen";
import history from '../history';
import ProductCategoriesManager from "./ProductCategories/ProductCategoriesManager";
import ProductsManager from "./Products/ProductsManager";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/PanelManagement" exact component={Users} />
                    <Route path="/PanelManagement/Companies" component={Companies} />
                    <Route path="/PanelManagement/ProductCategories" component={ProductCategoriesManager} />
                    <Route path="/PanelManagement/Products" component={ProductsManager} />
                </Switch>
            </Router>
        )
    }
}
