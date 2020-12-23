import React from "react";
import {withTranslation} from "react-i18next";
import './BestCompanies.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "../../utils/Services";

class BestCompanies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    getItems() {
        Services.getCompaniesList().then((response) => {
            this.setState({
                items: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });

    }

    componentDidMount() {
        this.getItems()
    }

    onBrandClick = (brand) => {
    };

    render() {
        const {t} = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        return (
            <div className="BestBrands-pic">
                {this.state.items.length > 0 ?
                    <div className='slider-container'>
                        <Slider {...settings}>
                            {
                                this.state.items.map((company, i) => {
                                    return (
                                        <div data-index={i} key={i} className='brand-block-item' onClick={() => this.onBrandClick(company)}>
                                            <div>
                                                <img
                                                    src={Services.getCompanyImageDownloadUrl(company.logo)}/>
                                            </div>
                                            <p className='product-name'>{company.name}</p>
                                        </div>
                                    )
                                })

                            }

                        </Slider>
                    </div> : null}
            </div>
        );
    }
}


function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", width: 50, height: 50}}
            onClick={onClick}
        >
            <img src={require("../image/arrow-right.png")}/>
        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", width: 50, height: 50}}
            onClick={onClick}
        >
            <img src={require("../image/arrow-left.png")}/>

        </div>
    );
}


export default withTranslation()(BestCompanies);
