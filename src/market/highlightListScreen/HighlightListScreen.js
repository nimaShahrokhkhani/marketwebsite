import React from "react";
import {withTranslation} from "react-i18next";
import './HighlightListScreen.css';
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
        Services.getHighlightList().then(response => {
            this.setState({
                highlightList: response.data
            })
        }).catch(error => {

        })
    }

    componentDidMount() {
        this.getHighlightsList()
    }

    onReadMoreClick = (highlight) => {
        this.props.history.push({
            pathname: '/Market/Highlight',
            state: {highlight: highlight}
        });
    };

    render() {
        const {t} = this.props;
        let {highlightList} = this.state;
        return (
            <div className="highlight_item_main">

                {highlightList.map((highlight, index) => (
                    <div className="highlight_item" style={{borderBottomWidth: index === highlightList.length - 1 && 0}}>

                        <div className="highlight_content_container">
                            <h1>{highlight.title}</h1>
                            <p className="summery-text">{renderHTML(highlight.summeryContent)}</p>
                            <a onClick={() => this.onReadMoreClick(highlight)} className="read-more-container"><p>ادامه مطلب</p></a>

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
