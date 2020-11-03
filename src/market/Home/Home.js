import React from 'react';
import './Home.css';
import ReactDOM from "react-dom";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {withTranslation, Trans} from 'react-i18next'
import BestSeller from "../bestSeller/BestSeller";
import Highlight from "../highlight/Highlight";
import NewCollection from "../newCollection/NewCollection";
import Blog from "../blog/Blog";
import ShopByCategory from "../shopByCategory/ShopByCategory";

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: "en"
        }
    }

    onLanguageHandle = (event) => {
        let newLang = event.target.value;
        this.setState({value: newLang})
        this.props.i18n.changeLanguage(newLang)
    };

    renderRadioButtons = () => {
        return (
            <div><input
                checked={this.state.value === 'en'}
                name="language" onChange={(e) => this.onLanguageHandle(e)} value="en" type="radio"/>English &nbsp;
                <input name="language" value="fa"
                       checked={this.state.value === 'fa'}
                       type="radio" onChange={(e) => this.onLanguageHandle(e)}/>farsi</div>
        )
    };

    render() {
        const {t} = this.props
        return (
            <div style={{marginTop: 116}}>
                <AwesomeSlider className='awesomeSlider'>
                    <div data-src="/images/slide1.jpg"/>
                    <div data-src="/images/slide2.jpg"/>
                    <div data-src="/images/slide3.jpg"/>
                </AwesomeSlider>
                <BestSeller/>
                <ShopByCategory/>
                <NewCollection/>
                <Highlight history={this.props.history}/>
                <Blog/>
            </div>
        );
    }
}

export default withTranslation()(Home);
