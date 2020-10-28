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
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
                    <td>{item.moreInformation}</td>
                    <td>
                        <div style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item.type)}>Del</Button>
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
                    <th>Type</th>
                    <th>Description</th>
                    <th>MoreInformation</th>
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
