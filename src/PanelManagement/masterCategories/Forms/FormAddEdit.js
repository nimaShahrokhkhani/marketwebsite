import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";
import './FormAddEdit.css';

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            image: '',
            isCandidate: false
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
        data.append('name', this.state.name);
        data.append('isCandidate', this.state.isCandidate);
        Services.insertMasterCategory(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle()
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        const data = new FormData();
        this.state.image && data.append('file', this.state.image);
        data.append('name', this.state.name);
        data.append('isCandidate', this.state.isCandidate);
        Services.editMasterCategory(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item?')
        if (confirmDelete) {
            this.props.deleteItemFromState(id)
        }

    };

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {
                name,
                isCandidate,
            } = this.props.item;
            this.setState({
                name: name ? name : '',
                isCandidate: isCandidate ? (isCandidate === 'true') : false
            })
        }
    }

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}}
                  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file" name="image" id="image" onChange={this.onChangeImage}
                           defaultValue={this.state.image === null ? '' : this.state.image} placeholder="image, logo"/>
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
