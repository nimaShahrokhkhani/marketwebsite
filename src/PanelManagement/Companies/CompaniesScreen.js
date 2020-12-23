import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'
import {CSVLink} from "react-csv"
import './Companies.css';
import Services from "../../utils/Services";
import Products from "../Products/Products";
import ScreenLoading from "../../components/screenLoading/ScreenLoading";

class CompaniesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            isDone: true
        }
    }

    getItems = () => {
        this.setState({
            isLoading: true,
            isDone: false
        }, () => {
            setTimeout(() => {
                Services.getCompaniesList().then((response) => {
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
    };

    addItemToState = (item) => {
        item.id = this.state.items.length + 1;
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.companyId === item.companyId)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.items.slice(0, itemIndex),
            // add the updated item to the array
            item,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({items: newArray})
    }

    deleteItemFromState = (companyId) => {
        Services.deleteCompany({companyId: companyId}).then((response) => {
            const updatedItems = this.state.items.filter(item => item.companyId !== companyId)
            this.setState({items: updatedItems})
        }).catch((error) => {
            console.log('error is:', error)
        });
    }

    componentDidMount() {
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
                                <h1 style={{margin: "20px 0", display: 'flex', fontSize: 30}}>Companies</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DataTable items={this.state.items} updateState={this.updateState}
                                           deleteItemFromState={this.deleteItemFromState} getItems={this.getItems}/>
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
                                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}
                                           getItems={this.getItems}/>
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

export default CompaniesScreen
