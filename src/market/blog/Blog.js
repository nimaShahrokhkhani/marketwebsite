import React from "react";
import {withTranslation} from "react-i18next";
import './Blog.css';

class Blog extends React.Component {
    render() {
        return (
            <div style={{marginTop: 200}}>
                <div className="blog-pic1">
                    <img src={require("../image/blog.jpg")}/>
                </div>
                <div className="blog-pic2">
                    <img src={require("../image/blog1.jpg")}/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Blog);
