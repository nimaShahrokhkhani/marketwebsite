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
                    <td><div className='table-cell'>{item.serialNumber}</div></td>
                    <td><div className='table-cell'>{item.name}</div></td>
                    <td><div className='table-cell'>{item.company}</div></td>
                    <td><div className='table-cell'>{item.description}</div></td>
                    <td><div className='table-cell'>{item.image &&
                    <img width='50px' height='50px' src={Services.getProductImageDownloadUrl(item.image)}/>}</div></td>
                    <td><div className='table-cell'>{item.price}</div></td>
                    <td><div className='table-cell'>{item.discount}</div></td>
                    <td><div className='table-cell'>{item.type}</div></td>
                    <td><div className='table-cell'>{item.dateModify}</div></td>
                    <td><div className='table-cell'>{item.brand}</div></td>
                    <td><div className='table-cell'>
                        {item.colors && item.colors.length > 0 &&
                        <CirclePicker
                            colors={item.colors.split(",")}/>
                        }
                    </div></td>
                    <td><div className='table-cell'>{item.totalCount}</div></td>
                    <td><div className='table-cell'>{item.existCount}</div></td>
                    <td><div className='table-cell'>{item.properties}</div></td>
                    <td><div className='table-cell'>
                        <div>
                            <Input style={{position: 'relative'}}
                                   type="checkbox" name="isBestSeller"
                                   id="isBestSeller"
                                   defaultChecked={item.isBestSeller ? (item.isBestSeller === 'true') : false}
                                   disabled="disabled"/>
                        </div>
                    </div></td>
                    <td><div className='table-cell'>
                        <div style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}
                                       getItems={this.props.getItems}/>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item.serialNumber)}>Del</Button>
                        </div>
                    </div></td>
                </tr>
            )
        });

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>serialNumber</th>
                    <th>name</th>
                    <th>company</th>
                    <th>description</th>
                    <th>image</th>
                    <th>price</th>
                    <th>discount</th>
                    <th>type</th>
                    <th>dateModify</th>
                    <th>brand</th>
                    <th>colors</th>
                    <th>totalCount</th>
                    <th>existCount</th>
                    <th>properties</th>
                    <th>isBestSeller</th>
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
