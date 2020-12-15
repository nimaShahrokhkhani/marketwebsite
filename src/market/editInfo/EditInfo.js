import React from "react";
import {withTranslation} from "react-i18next";
import './EditInfo.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "../../utils/Services";
import Checkbox from "../components/checkBox/CheckBox";

class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        const {t} = this.props;
        return (
            <div className="account1-main">
                <div id="Web_1280__2">
                    <svg className="Path_1" viewBox="-157.482 -369.812 551.433 1892.275">
                        <path id="Path_1"
                              d="M 393.9512634277344 42.29853439331055 L 211.0653381347656 -369.8121337890625 L -157.482177734375 1239.189086914062 L -49.47458648681641 1522.462890625 L 393.9512634277344 42.29853439331055 Z">
                        </path>
                    </svg>
                    <div id="Group_30">
                        <div id="Group_28">
                            <svg className="Path_2" viewBox="-117.449 -372.056 610.34 1204.192">
                                <path id="Path_2"
                                      d="M -87.93107604980469 832.135986328125 L 492.8908996582031 233.4375 L 382.2557678222656 -372.0559692382812 L -117.4488067626953 226.0350341796875 L -87.93107604980469 832.135986328125 Z">
                                </path>
                            </svg>
                        </div>
                        <div id="Group_29">
                            <img id="Rectangle_609" src={require("../image/Rectangle_609.png")}
                                 srcSet={`
    ${require('../image/Rectangle_609.png')} 1x, 
    ${require('../image/Rectangle_609@2x.png')} 2x
  `}/>
                        </div>
                    </div>
                    <svg className="Path_3" viewBox="-117.449 -372.056 610.34 1204.192">
                        <path id="Path_3"
                              d="M -87.93107604980469 832.135986328125 L 492.8908996582031 233.4375 L 382.2557678222656 -372.0559692382812 L -117.4488067626953 226.0350341796875 L -87.93107604980469 832.135986328125 Z">
                        </path>
                    </svg>
                    <svg className="Path_4" viewBox="-49.961 -231.941 304.475 218.819">
                        <path id="Path_4"
                              d="M -39.58599090576172 -13.12176513671875 L 254.5138397216797 -231.9409790039062 L -49.96070098876953 -174.1102294921875 L -39.58599090576172 -13.12176513671875 Z">
                        </path>
                    </svg>
                    <svg className="Path_5" viewBox="-157.482 -369.812 551.433 1661.819">
                        <path id="Path_5"
                              d="M 393.9512634277344 -7.89141845703125 L 211.0653381347656 -369.8121337890625 L -157.482177734375 1043.232788085938 L -49.47458648681641 1292.00732421875 L 393.9512634277344 -7.89141845703125 Z">
                        </path>
                    </svg>
                    <div id="Group_31">
                        <div id="Group_28_q">
                            <svg className="Path_2_r" viewBox="-117.449 -372.056 610.34 1204.192">
                                <path id="Path_2_r"
                                      d="M -87.93107604980469 832.135986328125 L 492.8908996582031 233.4375 L 382.2557678222656 -372.0559692382812 L -117.4488067626953 226.0350341796875 L -87.93107604980469 832.135986328125 Z">
                                </path>
                            </svg>
                        </div>
                        <div id="Group_29_s">
                            <img id="Rectangle_609_t" src={require("../image/Rectangle_609_t.png")}
                                 srcSet={`
    ${require('../image/Rectangle_609_t.png')} 1x, 
    ${require('../image/Rectangle_609_t@2x.png')} 2x
  `}/>
                        </div>
                    </div>
                    <svg className="Path_6" viewBox="-117.449 -372.056 610.34 1204.192">
                        <path id="Path_6"
                              d="M -87.93107604980469 832.135986328125 L 492.8908996582031 233.4375 L 382.2557678222656 -372.0559692382812 L -117.4488067626953 226.0350341796875 L -87.93107604980469 832.135986328125 Z">
                        </path>
                    </svg>
                    <svg className="Path_7" viewBox="-49.961 -231.941 304.475 218.819">
                        <path id="Path_7"
                              d="M -39.58599090576172 -13.12176513671875 L 254.5138397216797 -231.9409790039062 L -49.96070098876953 -174.1102294921875 L -39.58599090576172 -13.12176513671875 Z">
                        </path>
                    </svg>
                    <svg className="Rectangle_610">
                        <rect id="Rectangle_610" rx="0" ry="0" x="0" y="0" width="804" height="1105">
                        </rect>
                    </svg>
                    <div id="__1">
                        <span>اطلاعات حساب شخصی</span>
                    </div>
                    <svg className="Rectangle_611">
                        <rect id="Rectangle_611" rx="17" ry="17" x="0" y="0" width="522" height="67">
                        </rect>
                    </svg>
                    <svg className="Rectangle_612">
                        <rect id="Rectangle_612" rx="17" ry="17" x="0" y="0" width="522" height="67">
                        </rect>
                    </svg>
                    <svg className="Rectangle_613">
                        <rect id="Rectangle_613" rx="17" ry="17" x="0" y="0" width="522" height="67">
                        </rect>
                    </svg>
                    <svg className="Rectangle_614">
                        <rect id="Rectangle_614" rx="17" ry="17" x="0" y="0" width="522" height="67">
                        </rect>
                    </svg>
                    <svg className="Rectangle_615">
                        <rect id="Rectangle_615" rx="17" ry="17" x="0" y="0" width="522" height="67">
                        </rect>
                    </svg>
                    <div>
                        <input type="text" href="#" id="_1" placeholder="نام "/>
                    </div>


                    <div>
                        <input type="text" href="#" id="__ba1" placeholder="نام خانوادگی"/>
                    </div>


                    <div>
                        <input type="text" href="#" id="__bb" placeholder="شماره همراه "/>
                    </div>


                    <div>
                        <input type="text" href="#" id="___ba" placeholder="ایمیل"/>
                    </div>
                    <svg className="Rectangle_616">
                        <rect id="Rectangle_616" rx="0" ry="0" x="0" y="0" width="119" height="39">
                        </rect>
                    </svg>
                    <div id="__bc">
                        <span>تاریخ تولد</span>
                    </div>
                    <div>
                        <input type="date" href="#" id="__bd" placeholder="تاریخ تولد"/>
                    </div>
                    <div id="_ba">
                        <span>اختیاری</span>
                    </div>
                    <div id="Group_35">
                        <div id="Group_34">
                            <svg className="Rectangle_619">
                                <rect id="Rectangle_619" rx="20" ry="20" x="0" y="0" width="149" height="66">
                                </rect>
                            </svg>
                            <div id="_be">
                                <a href="#" id="_be1">انصراف</a>
                            </div>
                        </div>
                        <div id="Group_33">
                            <svg className="Rectangle_618">
                                <rect id="Rectangle_618" rx="20" ry="20" x="0" y="0" width="266" height="66">
                                </rect>
                            </svg>
                            <div d="___bh">
                                <a href="#" id="___bh">ثبت اطلاعات کاربری</a>
                            </div>
                        </div>
                    </div>
                    <div id="Group_36">
                        <svg className="image_here_Image">
                            <rect id="image_here_Image" rx="46" ry="46" x="0" y="0" width="237.623" height="305.444">
                            </rect>
                        </svg>
                        <img id="image_here_Image_bk" src={require("../image/image_here_Image_bk.png")}
                             srcSet={`
    ${require('../image/image_here_Image_bk.png')} 1x, 
    ${require('../image/image_here_Image_bk@2x.png')} 2x
  `}/>
                        <div id="______">


                            <p>خبرنامه گریماس را برای من ارسال کنید</p>


                        </div>
                        <label className="switch">
                            <input type="checkbox" checked/>
                            <Checkbox/>
                            <span className="slider round"></span>
                        </label>

                        <div id="_______">
                            <span>مایل به دریافت پیشنهادات ویژه از<br/>گریماس هستم</span>
                        </div>
                        <label className="switch1">
                            <input  type="checkbox" checked/>
                            <Checkbox/>
                            <span className="slider1 round"></span>
                        </label>
                    </div>
                </div>

                <div id="custom__1">
                    <svg className="Path_5" viewBox="0 0 265.75 160">
                        <path id="Path_5"
                              d="M 263.118896484375 0 L 0 60.84503936767578 L 0 160.0000152587891 L 265.75 160.0000152587891 L 263.118896484375 0 Z">
                        </path>
                    </svg>
                    <svg className="Path_6" viewBox="0 0 265.75 187">
                        <path id="Path_6"
                              d="M 263.1188354492188 0 L 0 82.69041442871094 L 0 186.9999847412109 L 265.75 186.9999847412109 L 263.1188354492188 0 Z">
                        </path>
                    </svg>
                    <svg className="Rectangle_1">
                        <rect id="Rectangle_1" rx="9" ry="9" x="0" y="0" width="223" height="60">
                        </rect>
                    </svg>
                    <svg className="Rectangle_5">
                        <rect id="Rectangle_5" rx="9" ry="9" x="0" y="0" width="223" height="60">
                        </rect>
                    </svg>
                    <svg className="Rectangle_6">
                        <rect id="Rectangle_6" rx="9" ry="9" x="0" y="0" width="223" height="60">
                        </rect>
                    </svg>
                    <svg className="Rectangle_7">
                        <rect id="Rectangle_7" rx="9" ry="9" x="0" y="0" width="223" height="60">
                        </rect>
                    </svg>

                    <div id="_">
                        <a href=""><span>حساب کاربری</span></a>&nbsp;&nbsp;<img
                        src={require("../image/manager-24.png")}/>
                    </div>

                    <div id="__">
                        <a href=""><span>لیست آدرس ها</span></a>&nbsp;&nbsp;<img
                        src={require("../image/map-marker-2-24.png")}/>
                    </div>

                    <div id="__ba">
                        <a href=""><span>پیگیری سفارش</span></a>&nbsp;&nbsp;<img
                        src={require("../image/purchase-order-24.png")}/>
                    </div>

                    <div id="___">
                        <a href=""><span>خروج از حساب کاربری</span></a>&nbsp;&nbsp;<img
                        src={require("../image/exit-24-2.png")}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(EditInfo);
