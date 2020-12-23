import React from "react";
import {withTranslation} from "react-i18next";
import './BlogScreen.css';
import Services from "../../utils/Services";
import renderHTML from 'react-render-html';
import Slider from "react-slick/lib";

class BlogScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {t} = this.props;
        let {content, title, contentImage} = this.props.location.state.blog;
        return (
            <div className='blogScreen-container'>
                <h1>{title}</h1>
                <img src={contentImage}/>
                {renderHTML(content)}
            </div>
        );
    }
}

export default withTranslation()(BlogScreen);
