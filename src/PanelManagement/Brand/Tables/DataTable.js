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
                        <div className='table-cell'>{item.name}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.image &&
                        <img width='50px' height='50px'
                             src={Services.getBrandImageDownloadUrl(item.image)}/>}</div>
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
                                <Button color="danger" onClick={() => this.deleteItem(item.type)}>Del</Button>
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
                    <th>Name</th>
                    <th>Image</th>
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
