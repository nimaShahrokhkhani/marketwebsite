import React from 'react';
import './ShoppingCart.css';
import {withTranslation} from 'react-i18next';
import connect from "react-redux/es/connect/connect";
import {
    addProduct,
    deleteProduct,
    decreaseProduct,
    increaseProduct,
    deleteAllProducts
} from "../../components/redux/actions";
import Services from "../../utils/Services";
import {Button} from 'reactstrap'

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.totalCount = 0;
        this.totalPrice = 0;
    }

    onLikeBtnClick = () => {

    };

    onDeleteBtnClick = (product) => {
        this.props.deleteProduct(product.value);
    };

    onMinusProductClick = (product) => {
        this.props.decreaseProduct(product.value);
    };

    onPlusProductClick = (product) => {
        this.props.increaseProduct(product.value);
    };

    onContinuePaymentClick = () => {
        if (this.props.products && this.props.products.length > 0) {
            if (this.props.user) {
                this.props.history.push({
                    pathname: '/Market/ContinuePaymentProcess',
                    state: {
                        products: this.props.products,
                        totalCost: this.totalPrice
                    }
                });
            } else {
                alert("لطفا وارد سایت شوید!!!")
            }
        }


    };

    render() {
        const {t} = this.props;
        return (
            <div style={{
                marginTop: 150,
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                alighnItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="shopping-cart">
                    <div className="shopping-cart-title">
                        سبد خرید
                    </div>

                    {this.props.products.map((product, i) => {
                        if (i === 0) {
                            this.totalCount = 0;
                            this.totalPrice = 0;
                        }
                        this.totalCount += product.count;
                        this.totalPrice += product.value.price * product.count;
                        return (
                            <div className="item">
                                <div className="buttons">
                                    <span onClick={() => this.onDeleteBtnClick(product)} className="delete-btn"></span>
                                    <span onClick={this.onLikeBtnClick} className="like-btn is-active"></span>
                                </div>

                                <div className="image">
                                    <img width='80px' height='80px'
                                         src={Services.getProductImageDownloadUrl(product.value.image)} alt=""/>
                                </div>

                                <div className="description">
                                    <span>{product.value.description}</span>
                                </div>

                                <div className="quantity">
                                    <button onClick={() => this.onPlusProductClick(product)} className="default-btn plus-btn"
                                            type="button" name="button">
                                        <img src={require("../image/plus.svg")} alt=""/>
                                    </button>
                                    <input className='count' type="text" name="name" value={product.count}/>
                                    <button onClick={() => this.onMinusProductClick(product)} className="default-btn minus-btn"
                                            type="button" name="button">
                                        <img src={require("../image/minus.svg")} alt=""/>
                                    </button>
                                </div>

                                <div
                                    className="total-price">{(product.value.price * product.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + t('currency')}</div>
                            </div>
                        )
                    })}


                </div>
                <div className="total-count-container">
                    <div className="total-count">
                        <p>جمع کل قیمت</p>
                        <p>(تعداد {this.totalCount})</p>
                        <p>:</p>
                        <p style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{this.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p>{t('currency')}</p>
                    </div>
                    <Button style={{
                        marginTop: 20,
                        width: 200,
                        backgroundColor: 'blue',
                        textAlign: 'center',
                        height: 40
                    }} color="success"
                    onClick={this.onContinuePaymentClick}>ادامه فرآیند خرید</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.user;
    const products = state.products;
    return {user, products};
};

export default connect(mapStateToProps, {
    addProduct,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    deleteAllProducts
})(withTranslation()(ShoppingCart));
