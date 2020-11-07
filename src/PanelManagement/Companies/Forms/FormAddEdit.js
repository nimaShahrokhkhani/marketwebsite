import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    country: '',
    companyId: '',
    ownerName: '',
    logo: '',
    description: ''
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  submitFormAdd = e => {
    e.preventDefault();
    let item = [{
      name: this.state.name,
      country: this.state.country,
      companyId: this.state.companyId,
      ownerName: this.state.ownerName,
      logo: this.state.logo,
      description: this.state.description
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
      name: this.state.name,
      country: this.state.country,
      companyId: this.state.companyId,
      ownerName: this.state.ownerName,
      logo: this.state.logo,
      description: this.state.description
    }];
    if(Array.isArray(item)) {
      this.props.updateState(item[0])
      this.props.toggle()
    } else {
      console.log('failure')
    }
  }

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
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="country">Country</Label>
          <Input type="text" name="country" id="country" onChange={this.onChange} value={this.state.country === null ? '' : this.state.country}  />
        </FormGroup>
        <FormGroup>
          <Label for="companyId">CompanyId</Label>
          <Input type="companyId" name="companyId" id="companyId" onChange={this.onChange} value={this.state.companyId === null ? '' : this.state.companyId}  />
        </FormGroup>
        <FormGroup>
          <Label for="ownerName">OwnerName</Label>
          <Input type="text" name="ownerName" id="ownerName" onChange={this.onChange} value={this.state.ownerName === null ? '' : this.state.ownerName}  />
        </FormGroup>
        <FormGroup>
          <Label for="logo">Logo</Label>
          <Input type="file" name="logo" id="logo" onChange={this.onChange} value={this.state.logo === null ? '' : this.state.logo}  placeholder="image, logo" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
