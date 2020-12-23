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
import BestBrands from "../bestBrands/BestBrands";
import BestCompanies from "../bestCompanies/BestCompanies";

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

    renderTitle(title) {
        return(
            <div style={{marginTop: 100, paddingRight: 50, display: 'flex', alignItems: 'center',backgroundColor: '#fff'}}>
                <div style={{border: '1px solid #c0c0c0', height: 1, flex: 1}}/>
                <p style={{fontFamily: 'IRANSansMobile-Bold', padding: 20, fontSize: 20, color: '#14213c'}}>{title}</p>
            </div>
        )
    }

    render() {
        const {t} = this.props;
        let {bannerSliderList} = this.state;
        return (
            <div style={{marginTop: 110, backgroundColor: '#fbfbfd'}}>
                <AwesomeSlider className='awesomeSlider'>
                    {bannerSliderList && bannerSliderList.map(bannerSlider => (
                        <div>
                            <img src={Services.getSliderImageDownloadUrl(bannerSlider.image)}/>
                        </div>
                    ))}
                </AwesomeSlider>
                {this.renderTitle('محصولات برتر')}
                <BestSeller history={this.props.history}/>
                {this.renderTitle('دسته بندی محصولات')}
                <ShopByCategory/>
                {this.renderTitle('برندهای برتر')}
                <BestBrands history={this.props.history}/>
                {this.renderTitle('محصولات جدید')}
                <NewCollection/>
                {this.renderTitle('هایلایت')}
                <Highlight history={this.props.history}/>
                {this.renderTitle('رویدادها')}
                <Events/>
                {this.renderTitle('شرکت های برتر')}
                <BestCompanies history={this.props.history}/>
            </div>
        );
    }
}

export default withTranslation()(Home);
