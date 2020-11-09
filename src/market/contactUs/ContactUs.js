import React from 'react';
import './ContactUs.css';
import {withTranslation, Trans} from 'react-i18next'
import {Button} from 'reactstrap';


class ContactUs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        const {t} = this.props
        return (
            <div className="body-us">

                    <div className="contact">
                        <img  width="400px" height="400px" src={require('../image/map2.jpg')}/>
                        <h1>تماس با ما</h1>
                        <p>
                            کاربر گرامی در صورت وجود هر گونه سوالی یا ابهامی فرم زیر را تکمیل نموده و یا از طریق شماره
                            های
                            زیر با ما تماس بگیرید.
                        </p>
                    </div>

                    <div className="container-us">
                        <h3>فرم ارسال پیام</h3>
                        <form action="/action_page.php">
                            <label htmlFor="fname"></label>
                            <input type="text" id="fname" name="firstname" placeholder="نام کاربری .."/><br/>

                            <label htmlFor="lname"></label>
                            <input type="text" id="email" name="Email" placeholder="ایمیل.."/>
                            <label htmlFor="lname"></label>
                            <input type="text" id="mobile" name="Mobile" placeholder="موبایل.."/>
                            <label htmlFor="city"></label>
                            <select id="city" name="city">
                                <option value="Tehran">تهران</option>
                                <option value="Tabriz">تبریز</option>
                                <option value="Garmsar">گرمسار</option>
                            </select><br/>

                            <label htmlFor="subject"></label>
                            <textarea id="subject" name="subject" placeholder="پیام.."
                                      style={{height: 75}}></textarea><br/>

                            <Button color="success" style={{marginLeft:330, width: 150}}> ارسال پیغام</Button>
                        </form>
                    </div>
                    <div className="contact1" color="white">
                        <h2>تماس با ما</h2>
                        <ul>
                            <li><img src={require("../image/phone-68-16-cu.png")}
                                     className='contactUs-image'/>  09124959331
                            </li>
                            <li><img src={require("../image/phone-68-16-cu.png")}
                                     className='contactUs-image'/>  09124945678
                            </li>
                            <li><img src={require("../image/phone-68-16-cu.png")}
                                     className='contactUs-image'/> 09122345678
                            </li>
                            <li><img src={require("../image/mail-16-cu.png")}
                                     className='contactUs-image'/> info@Grimas.ir
                            </li>
                        </ul>
                    </div>
            </div>
        );
    }
}

export default (ContactUs);
