import React from "react";
import {withTranslation} from "react-i18next";
import './AccountInfo.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Services from "../../utils/Services";

class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    onEditInfoClick = () => {
        this.props.history.push({
            pathname: '/Market/EditInfo'
        });
    };

    render() {
        const {t} = this.props;
        return (

            <div className="account_main">
                <div id="Web_1280__2">

                    <svg className="Rectangle__1">
                        <rect id="Rectangle__1" rx="0" ry="0" x="0" y="0" width="950" height="1280">
                            <img src={require("../image/photo_2020-11-19_14-59-28.jpg")}/>
                        </rect>
                    </svg>
                    <svg className="Rectangle_572">
                        <rect id="Rectangle_572" rx="0" ry="0" x="0" y="0" width="884" height="1098">
                        </rect>
                    </svg>
                    <svg className="Rectangle_567">
                        <rect id="Rectangle_567" rx="47" ry="47" x="0" y="0" width="844" height="196">
                        </rect>
                    </svg>
                    <svg className="Rectangle_573">
                        <rect id="Rectangle_573" rx="47" ry="47" x="0" y="0" width="844" height="260">
                        </rect>
                    </svg>
                    <svg className="Rectangle_574">
                        <rect id="Rectangle_574" rx="47" ry="47" x="0" y="0" width="844" height="240">
                        </rect>
                    </svg>
                    <svg className="Rectangle_575">
                        <rect id="Rectangle_575" rx="47" ry="47" x="0" y="0" width="844" height="224">
                        </rect>
                    </svg>
                    <div id="___1">
                        <span>:?????? ?? ?????? ????????????????</span>
                    </div>
                    <div id="__2">
                        <span>:?????????? ???????? ??????????</span>
                    </div>
                    <svg className="Line_68" viewBox="0 0 0.323 151.971">
                        <path id="Line_68" d="M 0 0 L 0.322998046875 151.9713745117188">
                        </path>
                    </svg>
                    <svg className="Line_70" viewBox="0 0 0.323 151.971">
                        <path id="Line_70" d="M 0 0 L 0.322998046875 151.9713745117188">
                        </path>
                    </svg>
                    <div id="birth">
                        <span>:?????????? ????????</span>
                    </div>

                    <div id="__r">
                        <span>???????????? ????</span>
                    </div>
                    <div id="circle1">
                        <span><img src={require("../image/circule.jpg")}/></span>
                    </div>
                    <div id="circle2">
                        <span><img src={require("../image/circule.jpg")}/></span>
                    </div>
                    <div id="circle3">
                        <span><img src={require("../image/circule.jpg")}/></span>
                    </div>
                    <div id="____s">
                        <span>?????? ?????????? ???????????? ????????????</span>
                    </div>
                    <div id="____t">
                        <span>?????????? ?????????? ?????????? ??????????????</span>
                    </div>
                    <div id="___u">
                        <span>?????????? ?????????? ????????????</span>
                    </div>
                    <div id="__v">
                        <span>?????????? ??????????????</span>
                    </div>

                    <svg className="Rectangle_570">
                        <rect id="Rectangle_570" rx="17.5" ry="17.5" x="0" y="0" width="799" height="35">
                        </rect>
                    </svg>
                    <div id="__x">
                        <span>?????????? ??????????</span>
                    </div>
                    <div id="T-T">
                        <span>??????????</span>
                    </div>
                    <div id="__z">
                        <span>?????? ????</span>
                    </div>
                    <div id="level">
                        <span>??????????</span>
                    </div>
                    <div id="_bb">
                        <span>??????????</span>
                    </div>
                    <div id="_bc">
                        <span>????????????</span>
                    </div>
                    <div id="_bd">
                        <span>????????????</span>
                    </div>
                    <div id="detail_123">
                        <span>????????????</span>
                    </div>
                    <div id="list_adress">
                        <span>???????? ???????? ????</span>
                    </div>
                    <div id="____ba">
                        <span><img src={require("../image/Capture3.png")}/></span>
                    </div>

                    <div id="____bb">
                        <a href="#" className="button">+ ???????????? ???????? ????????</a>
                    </div>


                    <div id="_bf">
                        <span>:??????????</span>
                    </div>
                    <div id="__bf">
                        <span><img src={require("../image/capture_edit1.PNG")}/></span>
                    </div>
                    <div id="bf1">
                        <a onClick={this.onEditInfoClick}><span>???????????? ?????????????? ????????????</span></a>
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
                        <a href=""><span>???????? ????????????</span></a>&nbsp;&nbsp;<img src={require("../image/manager-24.png")}/>
                    </div>

                    <div id="__">
                        <a href=""><span>???????? ???????? ????</span></a>&nbsp;&nbsp;<img src={require("../image/map-marker-2-24.png")}/>
                    </div>

                    <div id="__ba">
                        <a href=""><span>???????????? ??????????</span></a>&nbsp;&nbsp;<img src={require("../image/purchase-order-24.png")}/>
                    </div>

                    <div id="___">
                        <a href=""><span>???????? ???? ???????? ????????????</span></a>&nbsp;&nbsp;<img src={require("../image/exit-24-2.png")}/>
                    </div>
                </div>
            </div>

    );
    }
}

export default withTranslation()(AccountInfo);
