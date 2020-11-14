import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Users from "./Users/UsersManager";
import Companies from "./Companies/CompaniesScreen";
import history from '../history';
import ProductCategoriesManager from "./ProductCategories/ProductCategoriesManager";
import ProductsManager from "./Products/ProductsManager";
import HighlightsManager from "./Highlights/HighlightsManager";
import EventsManager from "./Events/EventsManager";
import BrandManager from "./Brand/BrandManager";
import BlogManager from "./Blogs/BlogManager";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/PanelManagement" exact component={Users} />
                    <Route path="/PanelManagement/Companies" component={Companies} />
                    <Route path="/PanelManagement/ProductCategories" component={ProductCategoriesManager} />
                    <Route path="/PanelManagement/Products" component={ProductsManager} />
                    <Route path="/PanelManagement/Highlights" component={HighlightsManager} />
                    <Route path="/PanelManagement/EventsManager" component={EventsManager} />
                    <Route path="/PanelManagement/BrandManager" component={BrandManager} />
                    <Route path="/PanelManagement/BlogManager" component={BlogManager} />
                </Switch>
            </Router>
        )
    }
}
