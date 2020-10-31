import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            type: '',
            description: '',
            moreInformation: '',
            image: '',
            isCandidate: false,
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
        data.append('type', this.state.type);
        data.append('description', this.state.description);
        data.append('moreInformation', this.state.moreInformation);
        data.append('isCandidate', this.state.isCandidate);
        Services.insertProductCategory(data).then((response) => {
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
        data.append('type', this.state.type);
        data.append('description', this.state.description);
        data.append('moreInformation', this.state.moreInformation);
        data.append('isCandidate', this.state.isCandidate);
        Services.editProductCategory(data).then((response) => {
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
                type,
                description,
                moreInformation,
                isCandidate
            } = this.props.item;
            this.setState({
                type: type ? type : '',
                description: description ? description : '',
                moreInformation: moreInformation ? moreInformation : '',
                isCandidate: isCandidate ? (isCandidate === 'true') : false
            })
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
                    <Label for="image">Image</Label>
                    <Input type="file" name="image" id="image" onChange={this.onChangeImage}
                           defaultValue={this.state.image === null ? '' : this.state.image} placeholder="image, logo"/>
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
