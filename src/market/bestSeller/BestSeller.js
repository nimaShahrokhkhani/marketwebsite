import React from "react";
import {withTranslation} from "react-i18next";
import './BestSeller.css';

class BestSeller extends React.Component {
    render() {
        return(
            <div className="Bestseller-pic">
                <img src={require("../image/bestSellerTitle.jpg")}/>
            </div>
        );
    }
}
export default withTranslation()(BestSeller);
