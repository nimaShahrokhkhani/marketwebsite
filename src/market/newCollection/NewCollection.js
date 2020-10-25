import React from "react";
import {withTranslation} from "react-i18next";
import './NewCollection.css';

class NewCollection extends React.Component {
    render() {
        return (
            <div>
                <div className="newcollection-pic1">
                    <img src={require("../image/newCollectionTitle.jpg")}/>
                </div>
                <div className="newcollection-pic2">
                    <img src={require("../image/newCollectionWall.jpg")}/>
                </div>
            </div>
    );
    }
    }
    export default withTranslation()(NewCollection);
