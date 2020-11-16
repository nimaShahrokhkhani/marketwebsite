import React from 'react';
import {withTranslation} from 'react-i18next'
import './FinalPaymentProcess.css';
import Services from "../../utils/Services";
import ReactStars from "react-rating-stars-component";
import {Tabs, Tab} from 'react-tab-view'
import {CirclePicker} from "react-color";
import {Button} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import {deleteAllProducts, setUser} from "../../components/redux/actions";


class FinalPaymentProcess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payType: ''
        }
    }

    endProcess = () => {
        var currentDate = new Date();
        var currentDateInMilliSec = currentDate.getMilliseconds();
        let {addressObject, paymentType, dayTimeObject, products, totalCost} = this.props.location.state;
        let requestData = {
            factorNumber: Math.floor((Math.random() * 1000000000) + 1),
            username: addressObject.username,
            phoneNumber: addressObject.phoneNumber,
            address: addressObject.address,
            transferType: paymentType,
            transferCost: 0,
            totalCost: totalCost,
            totalDiscount: 0,
            payableAmount: totalCost,
            fromTransferDateTime: dayTimeObject.fromDate,
            toTransferDateTime: dayTimeObject.toDate,
            paymentGateway: this.state.payType,
            paymentTrackingCode: Math.floor((Math.random() * 10000000) + 1),
            paymentDateTime: currentDateInMilliSec,
            products: products
        };
        Services.insertFactor(requestData).then(() => {
            alert('success')
            this.props.deleteAllProducts();
        }).catch(() => {
            alert('fail')
        })
    };

    onPaymentType = (type) => {
        this.setState({
            payType: type
        })
    };

    render() {
        const {t} = this.props;
        let {totalCost, dayTimeObject, addressObject} = this.props.location.state;
        return (
            <div className='baseFinalPayment-container'>
                <div className='finalPayment-container'>
                    <div className='payType-container'>
                        <p className='payType-title'>انتخاب شیوه‌ی پرداخت</p>
                        <div onClick={() => this.onPaymentType('online')}
                             className={'type-pay' + (this.state.payType === 'online' ? ' selected-current' : '')}>
                            <div className='payType-subContainer'>
                                <img src={require('../image/online-payment.png')}/>
                                <p className='payType-subTitle'>پرداخت اینترنتی</p>
                            </div>
                            <div className='payType-description'>
                                <p>پرداخت از طریق کلیه کارتهای عضو شتاب</p>
                            </div>
                        </div>
                        <div onClick={() => this.onPaymentType('offline')}
                             className={'type-pay' + (this.state.payType === 'offline' ? ' selected-current' : '')}>
                            <div className='payType-subContainer'>
                                <img src={require('../image/offline-payment.svg')}/>
                                <p className='payType-subTitle'>پرداخت در محل</p>
                            </div>
                            <div className='payType-description'>
                                <p>قابل پرداخت با تمامی کارتهای بانکی در زمان تحویل سفارش.</p>
                            </div>
                        </div>
                    </div>
                    <div className='transfer-description-container'>
                        <div className='transfer-description'>
                            <p>این سفارش در
                                بازه {dayTimeObject.fromDate.time + ' - ' + dayTimeObject.toDate.time} تاریخ {dayTimeObject.fromDate.day} به {addressObject.username} به
                                آدرس {addressObject.address} و شماره تماس {addressObject.phoneNumber} تحویل
                                می‌گردد.</p>
                        </div>
                        <div className='totalAmount-container'>
                            <div className='totalAmount-container-1'>
                                <div className='amount-container'>
                                    <div className='transfer-total-title-container'>
                                        <p className='transfer-total-title'>مبلغ کل خرید:</p>
                                    </div>
                                    <div className='sub-amount-container'>
                                        <p className='transfer-amount'>
                                            {totalCost}
                                        </p>
                                        <p className='transfer-currency'>
                                            {t('currency')}
                                        </p>
                                    </div>
                                </div>
                                <div className='amount-container'>
                                    <div className='transfer-total-title-container'>
                                        <p className='transfer-total-title'>هزینه ارسال، بیمه و بسته بندی:</p>
                                    </div>
                                    <div className='sub-amount-container'>
                                        <p className='transfer-amount'>
                                            0
                                        </p>
                                        <p className='transfer-currency'>
                                            {t('currency')}
                                        </p>
                                    </div>
                                </div>
                                <div className='amount-container'>
                                    <div className='transfer-total-title-container'>
                                        <p style={{color: '#f37a23'}} className='transfer-total-title'>تخفیف:</p>
                                    </div>
                                    <div className='sub-amount-container'>
                                        <p style={{color: '#f37a23'}} className='transfer-amount'>
                                            0
                                        </p>
                                        <p style={{color: '#f37a23'}} className='transfer-currency'>
                                            {t('currency')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='totalAmount-container-2'>
                                <div className='amount-container'>
                                    <div className='transfer-total-title-container'>
                                        <p className='transfer-total-title-end'>قابل پرداخت</p>
                                    </div>
                                    <div className='sub-amount-container'>
                                        <p className='transfer-amount-end'>
                                            {totalCost}
                                        </p>
                                        <p className='transfer-currency'>
                                            {t('currency')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={this.endProcess} color="success" style={{margin: 20, width: 200}}> پرداخت و تکمیل
                    خرید</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.user;
    return {user};
};

export default connect(mapStateToProps, {setUser, deleteAllProducts})(withTranslation()(FinalPaymentProcess));
