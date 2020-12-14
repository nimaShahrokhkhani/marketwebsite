import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Services from "../../../utils/Services";
import '../Products.css';
import {SketchPicker, CirclePicker} from 'react-color';

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            serialNumber: '',
            name: '',
            company: '',
            description: '',
            image: '',
            price: '',
            discount: '',
            type: '',
            subType: '',
            dateModify: '',
            comments: [],
            brand: '',
            colors: [],
            totalCount: 0,
            existCount: 0,
            rate: [],
            properties: [],
            property: '',
            isBestSeller: false,
            productColor: '#fff',
            productCategories: [],
            brands: []
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onChangeIsBestSeller = e => {
        this.setState({[e.target.name]: e.target.checked})
    };

    onChangeImage = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    handleChangeColorComplete = (color) => {
        this.setState({productColor: color.hex});
    };

    addToProductColor = () => {
        this.state.colors.push(this.state.productColor);
        this.setState({
            colors: this.state.colors
        })
    };

    submitFormAdd = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.state.image);
        data.append('serialNumber', this.state.serialNumber);
        data.append('name', this.state.name);
        data.append('company', this.state.company);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('discount', this.state.discount);
        data.append('type', this.state.type);
        data.append('subType', this.state.subType);
        data.append('dateModify', this.state.dateModify);
        data.append('comments', this.state.comments);
        data.append('brand', this.state.brand);
        data.append('colors', this.state.colors);
        data.append('totalCount', this.state.totalCount);
        data.append('existCount', this.state.existCount);
        data.append('rate', this.state.rate);
        data.append('properties', this.state.properties);
        data.append('isBestSeller', this.state.isBestSeller);
        Services.insertProduct(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    submitFormEdit = e => {
        e.preventDefault();
        const data = new FormData();
        this.state.image && data.append('file', this.state.image);
        data.append('serialNumber', this.state.serialNumber);
        data.append('name', this.state.name);
        data.append('company', this.state.company);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('discount', this.state.discount);
        data.append('type', this.state.type);
        data.append('subType', this.state.subType);
        data.append('dateModify', this.state.dateModify);
        data.append('comments', this.state.comments);
        data.append('brand', this.state.brand);
        data.append('colors', this.state.colors);
        data.append('totalCount', this.state.totalCount);
        data.append('existCount', this.state.existCount);
        data.append('rate', this.state.rate);
        data.append('properties', this.state.properties);
        data.append('isBestSeller', this.state.isBestSeller);
        Services.editProduct(data).then((response) => {
            this.props.getItems && this.props.getItems();
            this.props.toggle();
        }).catch((error) => {
            console.log(error)
        });
    };

    componentDidMount() {
        Services.getProductCategoryList().then((response) => {
            this.setState({
                productCategories: response.data
            });
        }).catch((error) => {
            console.log('error', error)
        });

        Services.getBrandList().then((response) => {
            this.setState({
                brands: response.data
            });
        }).catch((error) => {
            console.log('error', error)
        });
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const {
                serialNumber,
                name,
                company,
                description,
                image,
                price,
                discount,
                type,
                subType,
                dateModify,
                brand,
                colors,
                totalCount,
                existCount,
                properties,
                isBestSeller
            } = this.props.item;
            this.setState({
                serialNumber: serialNumber ? serialNumber : '',
                name: name ? name : '',
                company: company ? company : '',
                description: description ? description : '',
                image,
                price: price ? price : 0,
                discount: discount ? discount : 0,
                type: type ? type : '',
                subType: subType ? subType : '',
                dateModify: dateModify ? dateModify : '',
                brand: brand ? brand : '',
                colors: colors ? colors.split(",") : [],
                totalCount: totalCount ? totalCount : 0,
                existCount: existCount ? existCount : 0,
                properties: properties ? properties.split(",") : [],
                isBestSeller: isBestSeller ? (isBestSeller === 'true') : false
            })
        }
    }

    getSubTypesFromProductCategory(type) {
        if (this.state.productCategories && this.state.productCategories.length > 0) {
            let productCategory = this.state.productCategories.filter(product => product.type === this.state.type);
            if (productCategory && productCategory.length > 0 && productCategory[0].subTypes) {
                return productCategory[0].subTypes.split(',')
            }
        }
        return [];
    }

    onPropertyAddClick = () => {
        let properties = [...this.state.properties, this.state.property];
      this.setState({
          properties: properties,
          property: ''
      })
    };

    render() {
        return (
            <Form style={{display: "flex", flexDirection: "column"}}
                  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="serialNumber">SerialNumber</Label>
                    <Input type="text" name="serialNumber" id="serialNumber" onChange={this.onChange}
                           value={this.state.serialNumber === null ? '' : this.state.serialNumber}/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onChange}
                           value={this.state.name === null ? '' : this.state.name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="company">Company</Label>
                    <Input type="text" name="company" id="company" onChange={this.onChange}
                           value={this.state.company === null ? '' : this.state.company}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" onChange={this.onChange}
                           value={this.state.description === null ? '' : this.state.description}/>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file" name="image" id="image" onChange={this.onChangeImage}
                           defaultValue={this.state.image === null ? '' : this.state.image} placeholder="image, logo"/>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" name="price" id="price" onChange={this.onChange} value={this.state.price}/>
                </FormGroup>
                <FormGroup>
                    <Label for="discount">Discount</Label>
                    <Input type="number" name="discount" id="discount" onChange={this.onChange}
                           value={this.state.discount}/>
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <select name="type" id="type" onChange={this.onChange} value={this.state.type}>
                        <option value=''/>
                        {this.state.productCategories && this.state.productCategories.map(function (item) {
                            return <option value={item.type}> {item.type} </option>
                        })}
                    </select>
                </FormGroup>
                {this.getSubTypesFromProductCategory(this.state.type).length > 0 &&
                <FormGroup>
                    <Label for="subType">Sub Type</Label>
                    <select name="subType" id="subType" onChange={this.onChange} value={this.state.subType}>
                        <option value=''/>
                        {this.getSubTypesFromProductCategory(this.state.type).map(function (item) {
                            return <option value={item}> {item} </option>
                        })}
                    </select>
                </FormGroup>
                }
                <FormGroup>
                    <Label for="dateModify">DateModify</Label>
                    <Input type="date" name="dateModify" id="dateModify" onChange={this.onChange}
                           value={this.state.dateModify}/>
                </FormGroup>
                <FormGroup>
                    <Label for="brand">Brand</Label>
                    <select name="brand" id="brand" onChange={this.onChange} value={this.state.brand}>
                        <option value=''/>
                        {this.state.brands && this.state.brands.map(function (item) {
                            return <option value={item.name}> {item.name} </option>
                        })}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label for="colors">Colors</Label>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginRight: 20
                        }}>
                            <SketchPicker
                                color={this.state.productColor}
                                onChangeComplete={this.handleChangeColorComplete}
                            />
                            <Button onClick={this.addToProductColor}>Add Color</Button>
                        </div>
                        <div>
                            {this.state.colors && this.state.colors.length > 0 &&
                            <CirclePicker
                                onChange={() => {
                                    console.log('')
                                }}
                                colors={this.state.colors}/>}
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="totalCount">TotalCount</Label>
                    <Input type="number" name="totalCount" id="totalCount" onChange={this.onChange}
                           value={this.state.totalCount}/>
                </FormGroup>
                <FormGroup>
                    <Label for="existCount">ExistCount</Label>
                    <Input type="number" name="existCount" id="existCount" onChange={this.onChange}
                           value={this.state.existCount}/>
                </FormGroup>
                <FormGroup>
                    <Label for="properties">Properties</Label>
                    <div style={{display: 'flex'}}>
                        <Input type="text" name="property" id="property" onChange={this.onChange}
                               value={this.state.property}/>
                        <Button onClick={this.onPropertyAddClick}>Add</Button>
                    </div>
                    {this.state.properties && this.state.properties.map(function (property) {
                        return(
                            <p>{property}</p>
                        )
                    })}
                </FormGroup>
                <FormGroup>
                    <Label for="isBestSeller">IsBestSeller</Label>
                    <Input style={{position: 'relative', marginLeft: 0}} type="checkbox" name="isBestSeller"
                           id="isBestSeller" onChange={this.onChangeIsBestSeller}
                           defaultChecked={this.state.isBestSeller}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm
