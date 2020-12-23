import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Services from "../../../utils/Services";

class AddEditForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      country: '',
      ownerName: '',
      logo: '',
      description: ''
    };
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  onChangeImage = e => {
    this.setState({[e.target.name]: e.target.files[0]})
  };

  submitFormAdd = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.state.logo);
    data.append('name', this.state.name);
    data.append('country', this.state.country);
    data.append('companyId', 'company' + Math.floor((Math.random() * 10000000000) + 1));
    data.append('ownerName', this.state.ownerName);
    data.append('description', this.state.description);
    Services.insertCompany(data).then((response) => {
      this.props.getItems && this.props.getItems();
      this.props.toggle()
    }).catch((error) => {
      console.log(error)
    });
  };

  submitFormEdit = e => {
    e.preventDefault();
    const data = new FormData();
    this.state.image && data.append('file', this.state.logo);
    data.append('name', this.state.name);
    data.append('country', this.state.country);
    data.append('companyId', 'company' + Math.floor((Math.random() * 10000000000) + 1));
    data.append('ownerName', this.state.ownerName);
    data.append('description', this.state.description);
    Services.editCompany(data).then((response) => {
      this.props.getItems && this.props.getItems();
      this.props.toggle();
    }).catch((error) => {
      console.log(error)
    });
  };

  componentDidMount() {
    if (this.props.item) {
      const {
        name,
        country,
        ownerName,
        description,
      } = this.props.item;
      this.setState({
        name: name ? name : '',
        country: country ? country : '',
        ownerName: ownerName ? ownerName : '',
        description: description ? description : '',
      })
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
          <Label for="ownerName">OwnerName</Label>
          <Input type="text" name="ownerName" id="ownerName" onChange={this.onChange} value={this.state.ownerName === null ? '' : this.state.ownerName}  />
        </FormGroup>
        <FormGroup>
          <Label for="logo">Logo</Label>
          <Input type="file" name="logo" id="logo" onChange={this.onChangeImage} defaultValue={this.state.logo === null ? '' : this.state.logo}  placeholder="image, logo" />
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
