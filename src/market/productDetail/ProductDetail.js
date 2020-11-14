import React from 'react';
import {withTranslation} from 'react-i18next'
import './ProductDetail.css';
import Services from "../../utils/Services";
import ReactStars from "react-rating-stars-component";
import {Tabs, Tab} from 'react-tab-view'
import {CirclePicker} from "react-color";
import {Button} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import {setUser} from "../../components/redux/actions";


class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '#ffffff',
            comment: '',
            product: this.props.location.state.product,
            comments: JSON.parse(this.props.location.state.product.comments)
        }
    }

    ratingChanged = (newRating) => {
        console.log(newRating);
    };

    onChangeColor = (color, event) => {
        this.setState({color: color.hex});
    };

    onCommentAddClick = () => {
        const data = new FormData();
        let comments = [...JSON.parse(this.state.product.comments), {
            username: this.props.user ? this.props.user.username : 'ناشناس',
            comment: this.state.comment
        }];
        this.state.product.comments = comments;
        let product = this.state.product;
        data.append('serialNumber', this.state.product.serialNumber);
        data.append('comments', JSON.stringify(comments));
        Services.editProduct(data).then((response) => {
            this.setState({
                comment: '',
                comments: comments
            })
        }).catch((error) => {
            console.log(error)
        });
    };

    onCommentChange = (event) => {
        this.setState({comment: event.target.value});
    };

    render() {
        const {t} = this.props;
        const headers = ['ویژگی', 'مشخصات محصول', 'بررسی محصول', 'نظرات کاربران'];
        let {product, comments} = this.state;
        return (
            <div className='productDetail-container'>
                <div className="logo">
                    <img src={require("../image/logo-simple.jpg")}/>
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
                    <div className='star-container'>
                        <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>

                    <p> {product.name}</p>


                    <p>موجود در انبار: {product.existCount}</p>

                    <div className='product-price-container'>
                        <p className='product-currency'>{t('currency')}</p>
                        <p className='product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>

                    {product.colors && product.colors.split(',').length > 0 &&
                    <div className='color-picker-container'>
                        <CirclePicker
                            color={this.state.color}
                            onChangeComplete={this.onChangeColor}
                            colors={product.colors.split(",")}/>
                    </div>
                    }

                    <Button color="success" style={{width: 300}}> افزودن به سبد خرید</Button>

                </div>


                <div className="product-detail-nav">
                    <Tabs headers={headers}>
                        <Tab>
                            <div className='properties-container'>
                                {product.properties && product.properties.split(',').map(function (property) {
                                    return (
                                        <div
                                            style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                            <p>{property}</p>
                                            <span className="dot"/>
                                        </div>
                                    )
                                })}
                            </div>
                        </Tab>
                        <Tab>
                            <div className='properties-container'>
                                <table className='specifies-table'>
                                    <tr className='specifies-row'>
                                        <td className='specifies-th'>{product.serialNumber}</td>
                                        <td className='specifies-th'>کد محصول</td>
                                    </tr>
                                    <tr className='specifies-row'>
                                        <td className='specifies-th'>{product.company}</td>
                                        <td className='specifies-th'>فروشنده</td>
                                    </tr>
                                    <tr className='specifies-row'>
                                        <td className='specifies-th'>{product.brand}</td>
                                        <td className='specifies-th'>برند</td>
                                    </tr>
                                </table>
                            </div>
                        </Tab>
                        <Tab>
                            <div className='properties-container'>
                                <p>{product.description}</p>
                            </div>
                        </Tab>
                        <Tab>
                            <div className='comment-container'>

                                {comments && comments.length > 0 && comments.map(function (comment) {
                                    return (
                                        <div className='exist-comment'>
                                            <p className='exist-comment-username'>{comment.username}</p>
                                            <p className='exist-comment-body'> {comment.comment}</p>
                                        </div>
                                    )
                                })}

                                <p className='comment-title'>ثبت نظر</p>
                                <input className='comment-input' value={this.state.comment}
                                       onChange={this.onCommentChange} placeholder='نظر خود را بنویسید...'/>
                                <Button onClick={this.onCommentAddClick} color="success"> ثبت نظر</Button>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.user;
    return {user};
};

export default connect(mapStateToProps, {setUser})(withTranslation()(ProductDetail));
