import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
        this.props.deleteItemFromState(id)
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.company}</td>
          <td>{item.role}</td>
          <td>{item.email}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.birthday}</td>
          <td>{item.address}</td>
          <td>{item.identityNumber}</td>
          <td>
            <div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>serialNumber</th>
            <th>name</th>
            <th>company</th>
            <th>description</th>
            <th>image</th>
            <th>price</th>
            <th>discount</th>
            <th>type</th>
            <th>dateModify</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
