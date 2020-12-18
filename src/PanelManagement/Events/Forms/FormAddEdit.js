import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";
import '../Events.css';
import './FormAddEdit.css'

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            company: '',
            description: '',
            image: '',
            dateModify: '',
            events: [],
            isCandidate: false,
            eventDate: '',
            eventTitle: '',
            eventDescription: '',
            eventLocation: '',
            eventType: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onChangeIsCandidate = e => {
        this.setState({[e.target.name]: e.target.checked})
    };

    onChangeImage = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    submitFormAdd = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.state.image);
        data.append('id', this.state.id);
        data.append('company', this.state.company);
        data.append('description', this.state.description);
        data.append('dateModify', this.state.dateModify);
        data.append('type', this.state.eventType);
        data.append('isCandidate', this.state.isCandidate);
        data.append('events', JSON.stringify(this.state.events));
        Services.insertEvent(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        const data = new FormData();
        this.state.image && data.append('file', this.state.image);
        data.append('id', this.state.id);
        data.append('company', this.state.company);
        data.append('description', this.state.description);
        data.append('dateModify', this.state.dateModify);
        data.append('type', this.state.eventType);
        data.append('isCandidate', this.state.isCandidate);
        data.append('events', JSON.stringify(this.state.events));
        Services.editEvent(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {
                id,
                company,
                description,
                image,
                dateModify,
                type,
                events,
                isCandidate
            } = this.props.item;
            this.setState({
                id: id ? id : '',
                company: company ? company : '',
                description: description ? description : '',
                image,
                dateModify: dateModify ? dateModify : '',
                eventType: type ? type : '',
                isCandidate: isCandidate ? (isCandidate === 'true') : false
            })
        }
    }

    onAddEventClick = () => {
        let events = this.state.events.concat({
            date: this.state.eventDate,
            title: this.state.eventTitle,
            description: this.state.eventDescription,
            location: this.state.eventLocation,
        });
      this.setState({
          events: events,
          eventDate: '',
          eventTitle: '',
          eventDescription: '',
          eventLocation: ''
      })
    };

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}}
                  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="id">Id</Label>
                    <Input type="text" name="id" id="id" onChange={this.onChange}
                           value={this.state.id === null ? '' : this.state.id}/>
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company</Label>
                    <Input type="text" name="company" id="company" onChange={this.onChange}
                           value={this.state.company === null ? '' : this.state.company}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" onChange={this.onChange}
                           value={this.state.description === null ? '' : this.state.description}/>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file" name="image" id="image" onChange={this.onChangeImage}
                           defaultValue={this.state.image === null ? '' : this.state.image} placeholder="image, logo"/>
                </FormGroup>
                <FormGroup>
                    <Label for="dateModify">DateModify</Label>
                    <Input type="date" name="dateModify" id="dateModify" onChange={this.onChange}
                           value={this.state.dateModify}/>
                </FormGroup>
                <FormGroup>
                    <Label for="events">Events</Label>
                    {this.state.events.map(event => {
                        return(
                            <div className='event-row'>
                                <div className='event-column'>
                                    <p>date:</p>
                                    <p>{event.date}</p>
                                </div>
                                <div className='event-column'>
                                    <p>title:</p>
                                    <p>{event.title}</p>
                                </div>
                                <div className='event-column'>
                                    <p>description:</p>
                                    <p>{event.description}</p>
                                </div>
                                <div className='event-column'>
                                    <p>location:</p>
                                    <p>{event.location}</p>
                                </div>
                            </div>
                        )
                    })}
                    <Input type="date" placeholder="Event Date" name="eventDate" id="eventDate" onChange={this.onChange}
                           value={this.state.eventDate}/>
                    <Input type="text" placeholder="Event Title" name="eventTitle" id="eventTitle" onChange={this.onChange}
                           value={this.state.eventTitle}/>
                    <Input type="text" placeholder="Event Description" name="eventDescription" id="eventDescription" onChange={this.onChange}
                           value={this.state.eventDescription}/>
                    <Input type="text" placeholder="Event Location" name="eventLocation" id="eventLocation" onChange={this.onChange}
                           value={this.state.eventLocation}/>
                    <Button onClick={this.onAddEventClick}>Add Event</Button>
                </FormGroup>
                <FormGroup>
                    <Label for="eventType">EventType</Label>
                    <select name="eventType" id="eventType" onChange={this.onChange} value={this.state.eventType}>
                        <option value=''/>
                        {this.props.eventTypeList && this.props.eventTypeList.map(function (item) {
                            return <option value={item.name}> {item.name} </option>
                        })}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label for="isCandidate">IsCandidate</Label>
                    <Input style={{position: 'relative', marginLeft: 0}} type="checkbox" name="isCandidate"
                           id="isCandidate" onChange={this.onChangeIsCandidate}
                           defaultChecked={this.state.isCandidate}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm
