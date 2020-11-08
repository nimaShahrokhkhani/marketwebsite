import React, {Component} from 'react'
import {Table, Button, Input} from 'reactstrap';
import ModalForm from '../Modals/Modal'
import Services from "../../../utils/Services";
import {CirclePicker} from 'react-color';
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
                        <div className='table-cell'>{item.company}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.description}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.image &&
                        <img width='300px' height='100px' src={Services.getEventImageDownloadUrl(item.image)}/>}</div>
                    </td>
                    <td>
                        <div className='table-cell'>{item.dateModify}</div>
                    </td>
                    <td>
                        <div className='table-cell'>
                            <div>
                                <Input style={{position: 'relative'}}
                                       type="checkbox" name="isCandidate"
                                       id="isCandidate"
                                       defaultChecked={item.isCandidate ? (item.isCandidate === 'true') : false}
                                       disabled="disabled"/>
                            </div>
                        </div>
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
        });

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>company</th>
                    <th>description</th>
                    <th>image</th>
                    <th>dateModify</th>
                    <th>isCandidate</th>
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
