import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
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

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  submitFormAdd = e => {
    e.preventDefault();
    let item = [{
      username: this.state.username,
      password: this.state.password,
      company: this.state.company,
      role: this.state.role,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      birthday: this.state.birthday,
      address: this.state.address,
      identityNumber: this.state.identityNumber
    }];
    if(Array.isArray(item)) {
      this.props.addItemToState(item[0]);
      this.props.toggle()
    } else {
      console.log('failure')
    }
  };

  submitFormEdit = e => {
    e.preventDefault();
    let item = [{
      id: this.state.id,
      username: this.state.username,
      password: this.state.password,
      company: this.state.company,
      role: this.state.role,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      birthday: this.state.birthday,
      address: this.state.address,
      identityNumber: this.state.identityNumber
    }];
    if(Array.isArray(item)) {
      this.props.updateState(item[0])
      this.props.toggle()
    } else {
      console.log('failure')
    }
  };

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, first, last, email, phone, location, hobby } = this.props.item
      this.setState({ id, first, last, email, phone, location, hobby })
    }
  }

  render() {
    return (
      <Form style={{display: "flex", flexDirection: "column"}} onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username === null ? '' : this.state.username} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="text" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}  />
        </FormGroup>
        <FormGroup>
          <Label for="company">Company</Label>
          <Input type="text" name="company" id="company" onChange={this.onChange} value={this.state.company === null ? '' : this.state.company}  />
        </FormGroup>
        <FormGroup>
          <Label for="role">Role</Label>
          <Input type="text" name="role" id="role" onChange={this.onChange} value={this.state.role === null ? '' : this.state.role}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  placeholder="image, logo" />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">PhoneNumber</Label>
          <Input type="text" name="phoneNumber" id="phoneNumber" onChange={this.onChange} value={this.state.phoneNumber}  />
        </FormGroup>
        <FormGroup>
          <Label for="birthday">Birthday</Label>
          <Input type="date" name="birthday" id="birthday" onChange={this.onChange} value={this.state.birthday}  />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address}  />
        </FormGroup>
        <FormGroup>
          <Label for="identityNumber">IdentityNumber</Label>
          <Input type="text" name="identityNumber" id="identityNumber" onChange={this.onChange} value={this.state.identityNumber}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
