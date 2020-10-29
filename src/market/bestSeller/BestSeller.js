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
        Services.getProductsList().then((response) => {
            console.log(response.data)
            this.setState({
                items: response.data,
            });

        }).catch((error) => {

            console.log('error', error)
        });

    }
    componentDidMount(){
        this.getItems()
    }
    render() {
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
            <div className="Bestseller-pic">
                <img src={require("../image/bestSellerTitle.jpg")}/>
                {this.state.items.length > 0 ?
                    <div className='slider-container'>
                    <Slider {...settings}>
                        {
                            this.state.items.map((product, i) => {
                                return (
                                    <div data-index={i} key={i} className='block-item'>
                                        <h3>{product.name}</h3>
                                    </div>
                                )
                            })

                        }

                    </Slider>
                </div>:null}
            </div>
        );
    }
}


function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "red"}}
            onClick={onClick}
        >

        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "green"}}
            onClick={onClick}
        />
    );
}


export default withTranslation()(BestSeller);
