import React from "react";
import {withTranslation} from "react-i18next";
import './HighlightScreen.css';
import Services from "../../utils/Services";
import renderHTML from 'react-render-html';
import Slider from "react-slick/lib";

class HighlightScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {t} = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        let {content, products} = this.props.location.state.highlight;
        return (
            <div className='highlightScreen-container'>
                {renderHTML(content)}
                {products.length > 0 ?
                    <>
                        <div className='highlight-slider-container'>
                            <p style={{textAlign: 'center', fontSize: 36}}>Products</p>
                            <Slider {...settings}>
                                {
                                    products.map((product, i) => {
                                        return (
                                            <div data-index={i} key={i} className='block-item'>
                                                <img
                                                    src={Services.getProductImageDownloadUrl(product.image)}/>
                                                <p className='product-name'>{product.name}</p>
                                            </div>
                                        )
                                    })

                                }

                            </Slider>
                        </div>
                    </> : null}
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

export default withTranslation()(HighlightScreen);
