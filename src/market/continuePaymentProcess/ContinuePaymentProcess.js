import React from 'react';
import {withTranslation} from 'react-i18next'
import './ContinuePaymentProcess.css';
import Services from "../../utils/Services";
import ReactStars from "react-rating-stars-component";
import {Tabs, Tab} from 'react-tab-view'
import {CirclePicker} from "react-color";
import {Button} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import {setUser} from "../../components/redux/actions";


class ContinuePaymentProcess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addressObject: {},
            paymentType: '',
            dayTimeObject: {}
        }
    }

    continueProcess = () => {
        let {addressObject, paymentType, dayTimeObject} = this.state;
        if (addressObject === {} || paymentType === '' || dayTimeObject === {}) {
            alert('اطلاعات را تکمیل کنید!!!')
        } else {
            this.props.history.push({
                pathname: '/Market/FinalPaymentProcess',
                state: {
                    addressObject: this.state.addressObject,
                    paymentType: this.state.paymentType,
                    dayTimeObject: this.state.dayTimeObject,
                    products: this.props.location.state.products,
                    totalCost: this.props.location.state.totalCost
                }
            });
        }

    };

    onPaymentTypeClick = (type) => {
        this.setState({
            paymentType: type
        })
    };

    onAddressClick = () => {
        this.setState({
            addressObject: {
                username: this.props.user.username,
                phoneNumber: this.props.user.phoneNumber,
                address: this.props.user.address
            }
        })
    };

    onDayTimeClick = (fromDate, toDate) => {
        this.setState({
            dayTimeObject: {
                fromDate,
                toDate
            }
        }, () => {
            console.log(this.state.dayTimeObject.fromDate, JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                day: "شنبه",
                time: "09:00"
            }))
        })
    };

    render() {
        const {t} = this.props;
        console.log(this.state.addressObject.address === this.props.user.address)
        return (
            <div className='continuePayment-container'>
                <p className='title-payment'>مکان تحویل سفارش</p>
                <div className='address-container'>
                    <div className='add-address'>
                        <span>افزودن آدرس جدید</span>
                        <span className="btn-add">+  </span>
                    </div>
                    <div onClick={this.onAddressClick}
                         className={'current-address' + (this.state.addressObject.address === this.props.user.address ? ' selected-current' : '')}>
                        <div>
                            <p>{this.props.user.username}</p>
                            <img width='50px' height='50px' src={require('../image/user-process.png')}/>
                        </div>
                        <div>
                            <p>{this.props.user.phoneNumber}</p>
                            <img width='50px' height='50px' src={require('../image/phone-process.png')}/>
                        </div>
                        <div>
                            <p>{this.props.user.address}</p>
                            <img width='50px' height='50px' src={require('../image/address-process.png')}/>
                        </div>
                    </div>

                </div>

                <p className='title-payment'>شیوه ارسال</p>
                <div className='paymentType-container'>
                    <div onClick={() => this.onPaymentTypeClick('express')}
                         className={'paymentType-element' + (this.state.paymentType === 'express' ? ' selected-current' : '')}>
                        <div className='paymentType-type'>
                            <img src={require('../image/transfer-company.jpg')}/>
                            <div className='paymentType-textContainer'>
                                <p className='paymentType-textContainer-title'>
                                    اکسپرس
                                </p>
                                <p className='paymentType-textContainer-value'>
                                    فقط تهران
                                </p>
                            </div>
                        </div>
                        <div className='paymentType-cost'>
                            <p className='paymentType-cost-title'>
                                هزینه ارسال
                            </p>
                            <p className='paymentType-cost-value'>
                                رایگان
                            </p>
                        </div>

                    </div>
                    <div onClick={() => this.onPaymentTypeClick('post')}
                         className={'paymentType-element' + (this.state.paymentType === 'post' ? ' selected-current' : '')}>
                        <div className='paymentType-type'>
                            <img src={require('../image/transfer-post.jpg')}/>
                            <div className='paymentType-textContainer'>
                                <p className='paymentType-textContainer-title'>
                                    پست پیشتاز
                                </p>
                                <p className='paymentType-textContainer-value'>
                                    تا ۳ روز کاری
                                </p>
                            </div>
                        </div>
                        <div className='paymentType-cost'>
                            <p className='paymentType-cost-title'>
                                هزینه ارسال
                            </p>
                            <p className='paymentType-cost-value'>
                                رایگان
                            </p>
                        </div>

                    </div>

                </div>
                <p className='title-payment'>روز و زمان تحویل سفارش</p>
                <div className='dateTimeOrder-container'>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'شنبه' ? ' selected-current' : '')}>
                            <p>شنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'شنبه',
                            time: '09:00'
                        }, {
                            day: 'شنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'شنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'شنبه',
                            time: '13:00'
                        }, {
                            day: 'شنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'شنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'شنبه',
                            time: '17:00'
                        }, {
                            day: 'شنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'شنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'یکشنبه' ? ' selected-current' : '')}>
                            <p>یکشنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'یکشنبه',
                            time: '09:00'
                        }, {
                            day: 'یکشنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'یکشنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'یکشنبه',
                            time: '13:00'
                        }, {
                            day: 'یکشنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'یکشنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'یکشنبه',
                            time: '17:00'
                        }, {
                            day: 'یکشنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'یکشنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'دوشنبه' ? ' selected-current' : '')}>
                            <p>دوشنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'دوشنبه',
                            time: '09:00'
                        }, {
                            day: 'دوشنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'دوشنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'دوشنبه',
                            time: '13:00'
                        }, {
                            day: 'دوشنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'دوشنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'دوشنبه',
                            time: '17:00'
                        }, {
                            day: 'دوشنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'دوشنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'سه شنبه' ? ' selected-current' : '')}>
                            <p>سه شنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'سه شنبه',
                            time: '09:00'
                        }, {
                            day: 'سه شنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'سه شنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'سه شنبه',
                            time: '13:00'
                        }, {
                            day: 'سه شنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'سه شنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'سه شنبه',
                            time: '17:00'
                        }, {
                            day: 'سه شنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'سه شنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'چهارشنبه' ? ' selected-current' : '')}>
                            <p>چهارشنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'چهارشنبه',
                            time: '09:00'
                        }, {
                            day: 'چهارشنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'چهارشنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'چهارشنبه',
                            time: '13:00'
                        }, {
                            day: 'چهارشنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'چهارشنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'چهارشنبه',
                            time: '17:00'
                        }, {
                            day: 'چهارشنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'چهارشنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'پنجشنبه' ? ' selected-current' : '')}>
                            <p>پنجشنبه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'پنجشنبه',
                            time: '09:00'
                        }, {
                            day: 'پنجشنبه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'پنجشنبه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'پنجشنبه',
                            time: '13:00'
                        }, {
                            day: 'پنجشنبه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'پنجشنبه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'پنجشنبه',
                            time: '17:00'
                        }, {
                            day: 'پنجشنبه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'پنجشنبه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                    <div className='day-container'>
                        <div
                            className={'day' + (this.state.dayTimeObject.fromDate && this.state.dayTimeObject.fromDate.day === 'جمعه' ? ' selected-current' : '')}>
                            <p>جمعه</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'جمعه',
                            time: '09:00'
                        }, {
                            day: 'جمعه',
                            time: '13:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'جمعه',
                            time: '09:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 09:00 - 13:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'جمعه',
                            time: '13:00'
                        }, {
                            day: 'جمعه',
                            time: '17:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'جمعه',
                            time: '13:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 13:00 - 17:00</p>
                        </div>
                        <div onClick={() => this.onDayTimeClick({
                            day: 'جمعه',
                            time: '17:00'
                        }, {
                            day: 'جمعه',
                            time: '21:00'
                        })} className={'time' + (JSON.stringify(this.state.dayTimeObject.fromDate) === JSON.stringify({
                            day: 'جمعه',
                            time: '17:00'
                        }) ? ' selected-current' : '')}>
                            <p>ساعت 17:00 - 21:00</p>
                        </div>
                    </div>
                </div>
                <Button onClick={this.continueProcess} color="success" style={{margin: 20, width: 200}}> تایید اطلاعات و
                    ادامه</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const user = state.user;
    return {user};
};

export default connect(mapStateToProps, {setUser})(withTranslation()(ContinuePaymentProcess));
