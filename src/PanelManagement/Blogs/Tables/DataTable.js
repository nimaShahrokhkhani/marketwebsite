import React, {Component} from 'react'
import {Table, Button, Input} from 'reactstrap';
import ModalForm from '../Modals/Modal'
import Services from "../../../utils/Services";
import './DataTable.css';

class DataTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            this.props.deleteItemFromState(id)
        }

    };

    render() {

        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
                    <td>
                        <div className='table-cell'>{item.id}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.title}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.contentImage &&
                        <img width='200px' height='50px'
                             src={item.contentImage}/>}</div>
                    </td>
                    <td>
                        <div className='table-cell'>
                            <div style={{
                                display: 'flex',
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}
                                           getItems={this.props.getItems}/>
                                {' '}
                                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>ContentImage</th>
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
