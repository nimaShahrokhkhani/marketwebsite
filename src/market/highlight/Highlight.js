import React from "react";
import {withTranslation} from "react-i18next";
import './Highlight.css';
import Services from "../../utils/Services";
import renderHTML from 'react-render-html';

class Highlight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highlight: undefined
        }
    }

    componentDidMount() {
        Services.getHighlightList().then((response) => {
            this.setState({
                highlight: response.data && response.data[response.data.length - 1]
            })
        })
    }

    onReadMoreClick = () => {
        this.props.history.push({
            pathname: '/Market/Highlight',
            state: {highlight: this.state.highlight}
        });
    };

    render() {
        let {highlight} = this.state;
        return (
            <div className='highlight-container'>
                {highlight &&
                <>
                    <div className="highlight-pic2">
                        <img src={highlight.contentImage}/>
                    </div>
                    <div className="highlight-pic3">
                        {renderHTML(highlight.summeryContent)}
                        <div className='readMore-container'>
                            <div className='highlight-line'/>
                            <a className='read-more' onClick={this.onReadMoreClick}>
                                <p style={{fontSize: 13}}>ادامه مطلب</p>
                                <img style={{width: 15, marginLeft: 5}} src={require("../image/right-arrow.png")}/>
                            </a>
                        </div>
                    </div>
                </>
                }
            </div>
        );
    }
}

export default withTranslation()(Highlight);
