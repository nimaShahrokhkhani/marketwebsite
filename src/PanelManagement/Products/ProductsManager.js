import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'
import { CSVLink } from "react-csv"
import './Products.css';
import Services from "../../utils/Services";
import ScreenLoading from "../../components/screenLoading/ScreenLoading";

class ProductsManager extends Component {
    state = {
        items: [],
        isLoading: false,
        isDone: true
    }

    getItems(){
        this.setState({
            isLoading: true,
            isDone: false
        }, () => {
            setTimeout(() => {
                Services.getProductsList().then((response) => {
                    this.setState({
                        items: response.data,
                        isLoading: false
                    });
                    setTimeout(() => {
                        this.setState({isDone: true});
                    }, 1000);
                }).catch((error) => {
                    this.setState({
                        isLoading: false
                    });
                    setTimeout(() => {
                        this.setState({isDone: true});
                    }, 1000);
                    console.log('error', error)
                });
            }, 2000);
        })
    }

    addItemToState = (item) => {
        item.id = this.state.items.length + 1;
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.items.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount(){
        this.getItems()
    }

    render() {
        let {isLoading, isDone} = this.state;
        return (
            <>
                {isDone && !isLoading ?
                    <Container className="AppContainer">
                        <Row>
                            <Col>
                                <h1 style={{margin: "20px 0", display: 'flex', fontSize: 30}}>Products</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CSVLink
                                    filename={"db.csv"}
                                    color="primary"
                                    style={{float: "left", marginRight: "10px"}}
                                    className="btn btn-primary"
                                    data={this.state.items}>
                                    Download CSV
                                </CSVLink>
                                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <ScreenLoading
                        loading={isLoading}
                        done={isDone}/>
                }
            </>
        )
    }
}

export default ProductsManager
