import React from "react";
import {withTranslation} from "react-i18next";
import './BestSeller.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class BestSeller extends React.Component {
    render() {
        const settings = {
            dots: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return(
            <div className="Bestseller-pic">
                <img src={require("../image/bestSellerTitle.jpg")}/>
                <div className='slider-container'>
                    <Slider {...settings}>
                        <div className='block-item'>
                            <h3>1</h3>
                        </div>
                        <div className='block-item'>
                            <h3>2</h3>
                        </div>
                        <div className='block-item'>
                            <h3>3</h3>
                        </div>
                        <div className='block-item'>
                            <h3>4</h3>
                        </div>
                        <div className='block-item'>
                            <h3>5</h3>
                        </div>
                        <div className='block-item'>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


export default withTranslation()(BestSeller);
