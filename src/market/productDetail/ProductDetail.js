import React from 'react';
import {withTranslation} from 'react-i18next'
import './ProductDetail.css';
import Services from "../../utils/Services";
import ReactStars from "react-rating-stars-component";

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    ratingChanged = (newRating) => {
        console.log(newRating);
    };

    render() {
        const {t} = this.props;
        let {product} = this.props.location.state;
        return (
            <div className='productDetail-container'>
                <div className="logo">
                    <img src={require("../image/logo-simple.jpg")}/>

                </div>
                <div style={{
                    position: 'absolute',
                    right: 200,
                    top: 100
                }}>
                    <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="T">
                    <ul>
                        <li><a href="#"><img src={require("../image/heart.jpg")} alt="like"/></a></li>
                        <li><a href="#"><img src={require("../image/share.jpg")} alt="share"/></a></li>
                        <li><a href="#"><img src={require("../image/alert.jpg")} alt="noti"/></a></li>
                    </ul>
                </div>

                <div className="sale">
                    <img src={require("../image/discount.jpg")}/>

                </div>
                <div className="productDetail-image">

                    <img src={Services.getProductImageDownloadUrl(product.image)}/>

                </div>
                <div className="text1">
                    <p> {product.name}</p>

                    <p>برند:
                        میلوس   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;دسته
                        بندی:رژ لب جامد</p>

                    <p>ویژگی محصول: ویتامین دارد</p>

                    <p>موجود در انبار</p>

                    <p>قیمت:50/000 تومان</p>

                    <p1>دیدگاه کاربران &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  پرسش و
                        پاسخ
                    </p1>


                </div>
                {/*<div className="text2">
                    <p>رژ لب گریماس بدون اسانس و عاری از هرگونه مواد شیمیایی و دارای رنگ های با کیفیت می باشد.</p>
                </div>
                <div className="text3">
                    <h2>روش استفاده:</h2>

                    <ul>
                        <li>برای ماندگاری بالا شما می توانید قبل از استفاده رژ لب از مداد لب گریماس استفاده کنید.</li>
                    </ul>
                </div>
                <div className="text4">
                    <h3>روش پاک کردن:</h3>
                    <ul>
                        <li>برای پاک کردن رژ لب میلوس از کرم کلیزینگ استفاده کنید.
                        </li>
                    </ul>
                </div>*/}
            </div>
        );
    }
}

export default withTranslation()(ProductDetail);
