import React from 'react';
import './ShoppingCart.css';
import {withTranslation} from 'react-i18next';
import connect from "react-redux/es/connect/connect";
import {addProduct, deleteProduct, decreaseProduct, increaseProduct} from "../../components/redux/actions";
import Services from "../../utils/Services";

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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

                    {this.props.products.map(product => {
                        return (
                            <div className="item">
                                <div className="buttons">
                                    <span onClick={() => this.onDeleteBtnClick(product)} className="delete-btn"></span>
                                    <span onClick={this.onLikeBtnClick} className="like-btn is-active"></span>
                                </div>

                                <div className="image">
                                    <img width='80px' height='80px' src={Services.getProductImageDownloadUrl(product.value.image)} alt=""/>
                                </div>

                                <div className="description">
                                    <span>{product.value.description}</span>
                                </div>

                                <div className="quantity">
                                    <button onClick={() => this.onPlusProductClick(product)} className="plus-btn" type="button" name="button">
                                        <img src={require("../image/plus.svg")} alt=""/>
                                    </button>
                                    <input type="text" name="name" value={product.count}/>
                                    <button onClick={() => this.onMinusProductClick(product)} className="minus-btn" type="button" name="button">
                                        <img src={require("../image/minus.svg")} alt=""/>
                                    </button>
                                </div>

                                <div
                                    className="total-price">{product.value.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + t('currency')}</div>
                            </div>
                        )
                    })}


                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const products = state.products;
    return {products};
};

export default connect(mapStateToProps, {addProduct, deleteProduct, increaseProduct, decreaseProduct})(withTranslation()(ShoppingCart));
