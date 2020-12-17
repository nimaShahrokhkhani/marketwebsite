import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'
import {CSVLink} from "react-csv"
import './Events.css';
import Services from "../../utils/Services";
import ScreenLoading from "../../components/screenLoading/ScreenLoading";

class EventsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            isDone: true,
            eventTypeList: [],
            eventTypeName: ''
        }
    }

    getEventTypes() {
        Services.getEventTypeList().then(response => {
            this.setState({
                eventTypeList: response.data
            })
        }).catch(error => {
            console.log('error', error)
        })
    }

    getItems = () => {
        this.setState({
            isLoading: true,
            isDone: false
        }, () => {
            setTimeout(() => {
                Services.getEventList().then((response) => {
                    this.setState({
                        items: response.data,
                        isLoading: false
                    });
                    setTimeout(() => {
                        this.setState({isDone: true});
                    }, 1000);
                }).catch((error) => {
                    this.setState({
                        isLoading: false
                    });
                    setTimeout(() => {
                        this.setState({isDone: true});
                    }, 1000);
                    console.log('error', error)
                });
            }, 2000);
        })
    }

    addItemToState = (item) => {
        item.id = this.state.items.length + 1;
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.items.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({items: newArray})
    }

    deleteItemFromState = (id) => {
        Services.deleteEvent({id: id}).then((response) => {
            const updatedItems = this.state.items.filter(item => item.id !== id)
            this.setState({items: updatedItems})
        }).catch((error) => {
            console.log('error is:', error)
        });
    }

    componentDidMount() {
        this.getItems();
        this.getEventTypes();
    }

    onChangeEventType = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    addEventType = () => {
        Services.insertEventType({name: this.state.eventTypeName}).then(response => {
            window.location.reload();
        }).catch(error => {

        })
    };

    removeEventType = (eventType) => {
        Services.deleteEventType({name: eventType.name}).then(response => {
            window.location.reload();
        }).catch(error => {

        })
    };

    render() {
        let {isLoading, isDone, eventTypeList} = this.state;
        return (
            <>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{marginTop: 100, fontSize: 25, color: '#100f8a'}}>Event Types</p>
                    <div className="sliderForm">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <input type="text" className="bannerName" name="eventTypeName" placeholder="Event type name"
                                   onChange={this.onChangeEventType}/>
                        </div>
                        <button onClick={this.addEventType} className="todo_button">
                            <i className="fas fa-plus-square"> + </i>
                        </button>
                    </div>
                    <div className="todo_container event_type_list">
                        <ul className="todo_list" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {eventTypeList.length > 0 && eventTypeList.map(eventType => (
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                                    <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => this.removeEventType(eventType)}>
                                        <img style={{
                                            width: 20,
                                            height: 20
                                        }} src={require('../../market/image/delete.png')}/>
                                    </button>
                                    <p>{eventType.name}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                {isDone && !isLoading ?
                    <Container className="AppContainer">
                        <Row>
                            <Col>
                                <h1 style={{margin: "20px 0", display: 'flex', fontSize: 30}}>Events</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DataTable items={this.state.items} updateState={this.updateState}
                                           deleteItemFromState={this.deleteItemFromState}
                                           eventTypeList={this.state.eventTypeList}
                                           getItems={this.getItems}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CSVLink
                                    filename={"db.csv"}
                                    color="primary"
                                    style={{float: "left", marginRight: "10px"}}
                                    className="btn btn-primary"
                                    data={this.state.items}>
                                    Download CSV
                                </CSVLink>
                                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}
                                           getItems={this.getItems}/>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <ScreenLoading
                        loading={isLoading}
                        done={isDone}/>
                }
            </>
        )
    }
}


export default EventsManager
