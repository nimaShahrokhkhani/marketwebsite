import React from 'react';
import './Home.css';
import ReactDOM from "react-dom";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {withTranslation, Trans} from 'react-i18next'
import BestSeller from "../bestSeller/BestSeller";
import Highlight from "../highlight/Highlight";
import NewCollection from "../newCollection/NewCollection";
import Events from "../events/Events";
import Blog from "../blog/Blog";
import ShopByCategory from "../shopByCategory/ShopByCategory";
import Services from "../../utils/Services";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "en",
            bannerSliderList: []
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

    getBannerSliderList() {
        Services.getBannerSliderList().then(response => {
            this.setState({
                bannerSliderList: response.data
            })
        }).catch(error => {

        })
    }

    componentDidMount() {
        this.getBannerSliderList();
    }

    render() {
        const {t} = this.props;
        let {bannerSliderList} = this.state;
        return (
            <div style={{marginTop: 110}}>
                <AwesomeSlider className='awesomeSlider'>
                    {bannerSliderList && bannerSliderList.map(bannerSlider => (
                        <div>
                            <img src={Services.getSliderImageDownloadUrl(bannerSlider.image)}/>
                        </div>
                    ))}
                </AwesomeSlider>
                <BestSeller history={this.props.history}/>
                <ShopByCategory/>
                <NewCollection/>
                <Highlight history={this.props.history}/>
                <Events/>
                {/*<Blog/>*/}
            </div>
        );
    }
}

export default withTranslation()(Home);
