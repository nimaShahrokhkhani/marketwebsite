import React, {Component} from 'react'
import {Table, Button} from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            this.props.deleteItemFromState(id)
        }

    }

    render() {

        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
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
                        <div style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}
                                       getItems={this.props.getItems}/>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item.username)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>username</th>
                    <th>password</th>
                    <th>company</th>
                    <th>role</th>
                    <th>email</th>
                    <th>phoneNumber</th>
                    <th>birthday</th>
                    <th>address</th>
                    <th>identityNumber</th>
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
