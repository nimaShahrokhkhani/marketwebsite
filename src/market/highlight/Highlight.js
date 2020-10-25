import React from "react";
import {withTranslation} from "react-i18next";
import './Highlight.css';

class Highlight extends React.Component {
    render() {
        return (
            <div style={{marginTop: 200}}>
                <div className="highlight-pic1">
                    <img src={require("../image/highlightTitle.jpg")}/>
                </div>
                <div className="highlight-pic2">
                    <img src={require("../image/highlightBg.jpg")}/>
                </div>
                <div className="highlight-pic3">
                    <img src={require("../image/highlightFooter.jpg")}/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Highlight);
