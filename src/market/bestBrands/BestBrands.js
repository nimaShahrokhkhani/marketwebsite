import React from "react";
import {withTranslation} from "react-i18next";
import './BestBrands.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "../../utils/Services";

class BestBrands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    getItems() {
        Services.getBrandList().then((response) => {
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
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        return (
            <div className="BestBrands-pic">
                {this.state.items.length > 0 ?
                    <div className='slider-container'>
                        <Slider {...settings}>
                            {
                                this.state.items.map((brand, i) => {
                                    return (
                                        <div data-index={i} key={i} className='brand-block-item' onClick={() => this.onBrandClick(brand)}>
                                            <div>
                                                <img
                                                    src={Services.getBrandImageDownloadUrl(brand.image)}/>
                                            </div>
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


export default withTranslation()(BestBrands);
