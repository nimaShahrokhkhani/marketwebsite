import React, {Component} from 'react'
import {Table, Button} from 'reactstrap';
import ModalForm from '../Modals/Modal'
import Services from "../../../utils/Services";

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
                    <td>
                        <div className='table-cell'>{item.name}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.country}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.companyId}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.ownerName}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.logo &&
                        <img width='50px' height='50px'
                             src={Services.getCompanyImageDownloadUrl(item.logo)}/>}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.description}</div>
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
                                <Button color="danger" onClick={() => this.deleteItem(item.companyId)}>Del</Button>
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
                    <th>Country</th>
                    <th>CompanyId</th>
                    <th>OwnerName</th>
                    <th>Logo</th>
                    <th>Description</th>
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
