import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home.js";
import HighlightScreen from "./highlightScreen/HighlightScreen";
import Products from "./products/Products";
import ProductDetail from "./productDetail/ProductDetail";
import ShoppingCart from "./shoppingCart/ShoppingCart";

import history from '../history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Market" exact component={Home} />
                    <Route path="/Market/Highlight" component={HighlightScreen} />
                    <Route path="/Market/Products" component={Products} />
                    <Route path="/Market/ProductDetail" component={ProductDetail} />
                    <Route path="/Market/ShoppingCart" component={ShoppingCart} />
                </Switch>
            </Router>
        )
    }
}
