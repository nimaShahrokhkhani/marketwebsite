import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";

class AddEditForm extends React.Component {
    state = {
        id: 0,
        serialNumber: '',
        name: '',
        company: '',
        description: '',
        image: '',
        price: '',
        discount: '',
        type: '',
        dateModify: ''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitFormAdd = e => {
        e.preventDefault();
        let item = {
            serialNumber: this.state.serialNumber,
            name: this.state.name,
            company: this.state.company,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            discount: this.state.discount,
            type: this.state.type,
            dateModify: this.state.dateModify
        };
        Services.insertProduct(item).then((response) => {
            this.props.addItemToState(item);
            this.props.toggle()
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        let item = [{
            id: this.state.id,
            serialNumber: this.state.serialNumber,
            name: this.state.name,
            company: this.state.company,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            discount: this.state.discount,
            type: this.state.type,
            dateModify: this.state.dateModify
        }];
        if (Array.isArray(item)) {
            // console.log(item[0])
            this.props.updateState(item[0])
            this.props.toggle()
        } else {
            console.log('failure')
        }
    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {id, first, last, email, phone, location, hobby} = this.props.item
            this.setState({id, first, last, email, phone, location, hobby})
        }
    }

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}} onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="serialNumber">SerialNumber</Label>
                    <Input type="text" name="serialNumber" id="serialNumber" onChange={this.onChange}
                           value={this.state.serialNumber === null ? '' : this.state.serialNumber}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onChange}
                           value={this.state.name === null ? '' : this.state.name}/>
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
                    <Input type="file" name="image" id="image" onChange={this.onChange}
                           value={this.state.image === null ? '' : this.state.image} placeholder="image, logo"/>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price}/>
                </FormGroup>
                <FormGroup>
                    <Label for="discount">Discount</Label>
                    <Input type="text" name="discount" id="discount" onChange={this.onChange}
                           value={this.state.discount}/>
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="text" name="type" id="type" onChange={this.onChange} value={this.state.type}/>
                </FormGroup>
                <FormGroup>
                    <Label for="dateModify">DateModify</Label>
                    <Input type="date" name="dateModify" id="dateModify" onChange={this.onChange}
                           value={this.state.dateModify}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm
