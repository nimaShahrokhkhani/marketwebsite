import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            username: '',
            password: '',
            company: '',
            role: '',
            email: '',
            phoneNumber: '',
            birthday: '',
            address: '',
            identityNumber: ''
        };
    }


    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitFormAdd = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        data.append('company', this.state.company);
        data.append('role', this.state.role);
        data.append('email', this.state.email);
        data.append('phoneNumber', this.state.phoneNumber);
        data.append('birthday', this.state.birthday);
        data.append('address', this.state.address);
        data.append('identityNumber', this.state.identityNumber);
        Services.insertUser(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        data.append('company', this.state.company);
        data.append('role', this.state.role);
        data.append('email', this.state.email);
        data.append('phoneNumber', this.state.phoneNumber);
        data.append('birthday', this.state.birthday);
        data.append('address', this.state.address);
        data.append('identityNumber', this.state.identityNumber);
        Services.editUser(data).then((response) => {
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
                username,
                password,
                company,
                role,
                email,
                phoneNumber,
                birthday,
                address,
                identityNumber
            } = this.props.item;
            this.setState({
                username: username ? username : '',
                password: password ? password : '',
                company: company ? company : '',
                role: role ? role : '',
                email: email ? email : '',
                phoneNumber: phoneNumber ? phoneNumber : '',
                birthday: birthday ? birthday : '',
                address: address ? address : '',
                identityNumber: identityNumber ? identityNumber : ''
            })
        }
    }

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}}
                  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" onChange={this.onChange}
                           value={this.state.username === null ? '' : this.state.username}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="text" name="password" id="password" onChange={this.onChange}
                           value={this.state.password === null ? '' : this.state.password}/>
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company</Label>
                    <Input type="text" name="company" id="company" onChange={this.onChange}
                           value={this.state.company === null ? '' : this.state.company}/>
                </FormGroup>
                <FormGroup>
                    <Label for="role">Role</Label>
                    <Input type="text" name="role" id="role" onChange={this.onChange}
                           value={this.state.role === null ? '' : this.state.role}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="emaill" onChange={this.onChange}
                           value={this.state.email === null ? '' : this.state.email}/>
                </FormGroup>
                <FormGroup>
                    <Label for="phoneNumber">PhoneNumber</Label>
                    <Input type="text" name="phoneNumber" id="phoneNumber" onChange={this.onChange}
                           value={this.state.phoneNumber}/>
                </FormGroup>
                <FormGroup>
                    <Label for="birthday">Birthday</Label>
                    <Input type="date" name="birthday" id="birthday" onChange={this.onChange}
                           value={this.state.birthday}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address}/>
                </FormGroup>
                <FormGroup>
                    <Label for="identityNumber">IdentityNumber</Label>
                    <Input type="text" name="identityNumber" id="identityNumber" onChange={this.onChange}
                           value={this.state.identityNumber}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm
