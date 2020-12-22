import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./legoLoading.json";
import * as doneData from "./doneLoading.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default class ScreenLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: 'flex', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0'}}>
                {!this.props.done && (
                    <FadeIn>
                        <div class="d-flex justify-content-center align-items-center">
                            {this.props.loading ? (
                                <Lottie options={defaultOptions} height={120} width={120} />
                            ) : (
                                <Lottie options={defaultOptions2} height={120} width={120} />
                            )}
                            <h1>در حال بارگیری</h1>
                        </div>
                    </FadeIn>
                )}
            </div>
        );
    }
}
