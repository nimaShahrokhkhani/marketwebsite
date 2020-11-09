import React from "react";
import {withTranslation} from "react-i18next";
import './Events.css';
import Services from "../../utils/Services";
import Slider from "react-slick/lib";
import AwesomeSlider from "react-awesome-slider";

class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: {}
        }
    }

    getItems() {
        Services.getEventList({isCandidate: 'true'}).then((response) => {
            console.log('new collections:', response.data)
            this.setState({
                event: response.data[0],
            });
        }).catch((error) => {
            console.log('error', error)
        });

    }

    componentDidMount() {
        this.getItems()
    }

    render() {
        const {t} = this.props;
        let {event} = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className='events-container'>
                <div className="title-container">
                    <div className='line'/>
                    <div className='image-container'>
                        <p>Events</p>
                    </div>
                    <div className='line'/>
                </div>

                <div className='event-container'>
                    {event.image && <img width='70%' height='400px' src={Services.getEventImageDownloadUrl(event.image)}/>}
                    {event.events && JSON.parse(event.events).length > 0 ?
                        <AwesomeSlider className='event-slider' organicArrows={false}>
                            {
                                JSON.parse(event.events).map((event, i) => {
                                    return (
                                        <div data-index={i} key={i} className='event-item-slider'>
                                            <p className='event-title'>{event.title}</p>
                                            <p className='event-description'>{event.description}</p>
                                            <p className='event-location'>{event.location}</p>
                                        </div>
                                    )
                                })

                            }
                        </AwesomeSlider>
                        : null}
                </div>

            </div>
        );
    }
}

export default withTranslation()(Events);
