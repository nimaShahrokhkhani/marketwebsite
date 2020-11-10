import React from "react";
import {withTranslation} from "react-i18next";
import './BestSeller.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "../../utils/Services";

class BestSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    getItems() {
        Services.getProductsList({isBestSeller: 'true'}).then((response) => {
            console.log(response.data)
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

    onProductClick = (product) => {
        this.props.history.push({
            pathname: '/Market/ProductDetail',
            state: {product: product}
        });
    };

    render() {
        const {t} = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        return (
            <div className="Bestseller-pic">
                <img src={require("../image/bestSellerTitle.jpg")}/>
                {this.state.items.length > 0 ?
                    <div className='slider-container'>
                        <Slider {...settings}>
                            {
                                this.state.items.map((product, i) => {
                                    return (
                                        <div data-index={i} key={i} className='block-item' onClick={() => this.onProductClick(product)}>
                                            <img
                                                 src={Services.getProductImageDownloadUrl(product.image)}/>
                                            <p className='product-name'>{product.name}</p>
                                            <div className='price-container'>
                                                <p className='product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                <p className='product-currency'>{t('currency')}</p>
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


export default withTranslation()(BestSeller);
