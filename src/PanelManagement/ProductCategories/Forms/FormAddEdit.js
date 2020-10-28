import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";

class AddEditForm extends React.Component {
    state = {
        id: 0,
        type: '',
        description: '',
        moreInformation: '',
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitFormAdd = e => {
        e.preventDefault();
        let item = {
            type: this.state.type,
            description: this.state.description,
            moreInformation: this.state.moreInformation
        };
        Services.insertProductCategory(item).then((response) => {
            this.props.addItemToState(item);
            this.props.toggle()
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        let item = [{
            type: this.state.type,
            description: this.state.description,
            moreInformation: this.state.moreInformation
        }];
        if (Array.isArray(item)) {
            this.props.updateState(item[0])
            this.props.toggle()
        } else {
            console.log('failure')
        }
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {type, description, moreInformation} = this.props.item;
            this.setState({type, description, moreInformation})
        }
    }

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}} onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="text" name="type" id="type" onChange={this.onChange} value={this.state.type}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" onChange={this.onChange}
                           value={this.state.description === null ? '' : this.state.description}/>
                </FormGroup>
                <FormGroup>
                    <Label for="moreInformation">MoreInformation</Label>
                    <Input type="text" name="moreInformation" id="moreInformation" onChange={this.onChange}
                           value={this.state.moreInformation === null ? '' : this.state.moreInformation}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm
