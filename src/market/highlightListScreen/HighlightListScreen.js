import React from "react";
import {withTranslation} from "react-i18next";
import './HighlightListScreen.css.css';
import Services from "../../utils/Services";
import renderHTML from "react-render-html";

class HighlightListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highlightList: []
        }
    }

    getHighlightsList() {
        Services.getHighlightsList().then(response => {
            this.setState({
                highlightList: response.data
            })
        }).catch(error => {

        })
    }

    componentDidMount() {
        this.getHighlightsList()
    }

    render() {
        const {t} = this.props;
        let {highlight} = this.state;
        return (
            <div className="highlight_item_main">

                {highlight.map((highlight, index) => (
                    <div className="highlight_item" style={{borderBottomWidth: index === highlight.length - 1 && 0}}>

                        <div className="highlight_content_container">
                            <h1>{highlight.title}</h1>
                            <p>{renderHTML(highlight.summeryContent)}</p>

                        </div>
                        <div className="highlight_Image_container">
                            <img src={highlight.contentImage}/>
                        </div>

                    </div>
                ))}
            </div>
        );
    }
}

export default withTranslation()(HighlightListScreen);
