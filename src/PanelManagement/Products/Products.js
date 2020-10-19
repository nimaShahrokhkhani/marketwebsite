import React from 'react';
import {useEffect} from 'react'
import ReactDOM from 'react-dom';
import CRUDTable,
{
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm,
} from 'react-crud-table';

// Component's Base CSS
import './Products.css';

const DescriptionRenderer = ({field}) => <textarea {...field} />;

let products = [
    {
        id: 1,
        serialNumber: '',
        name: '',
        company: '',
        description: '',
        image: '',
        price: '',
        discount: '',
        type: '',
        dateModify: '',

    },


];

const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === 'id') {
        sorter = data.direction === 'ascending' ?
            SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter = data.direction === 'ascending' ?
            SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
};


let count = products.length;
const service = {
    fetchItems: (productList, payload) => {
        let result = productList ? Array.from(productList) : [];
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result);
    },
    create: (product) => {
        count += 1;
        products.push({
            ...product,
            id: count,
        });
        return Promise.resolve(product);
    },
    update: (data) => {
        const product = products.find(t => t.id === data.id);
        product.serialNumber = data.serialNumber;
        product.name = data.name;
        product.company = data.company;
        product.description = data.description;
        product.image = data.image;
        product.price = data.price;
        product.discount = data.discount;
        product.type = data.type;
        product.dateModify = data.dateModify;
        return Promise.resolve(product);
    },
    delete: (data) => {
        const product = products.find(t => t.id === data.id);
        products = products.filter(t => t.id !== product.id);
        return Promise.resolve(product);
    },
};

const styles = {
    container: {margin: 'auto', width: 'fit-content', marginTop: 20},
};

const Products = ({productList}) => {
    let productListTemp = [];
    useEffect(() => {
        productListTemp = productList
    }, [productList]);
    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Products"
                fetchItems={payload => service.fetchItems(productListTemp, payload)}
            >
                <Fields>
                    <Field
                        name="id"
                        label="Id"
                        hideInCreateForm
                    />
                    <Field
                        name="serialNumber"
                        label="SerialNumber"
                        placeholder="SerialNumber"
                        type="file"
                    />
                    <Field
                        name="name"
                        label="Name"

                    />
                    <Field
                        name="company"
                        label="Company"

                    />
                    <Field
                        name="description"
                        label="Description"

                    />
                    <Field
                        name="image"
                        label="Image"
                        type="number"

                    />
                    <Field
                        name="price"
                        label="Price"

                    />
                    <Field
                        name="discount"
                        label="Discount"

                    />
                    <Field
                        name="type"
                        label="Type"

                    />
                    <Field
                        name="dateModify"
                        label="DateModify"

                    />
                </Fields>
                <CreateForm
                    title="Product Creation"
                    message="Create a new product!"
                    trigger="Add product"
                    onSubmit={product => service.create(product)}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.serialNumber) {
                            errors.serialNumber = 'Please, provide product\'s serialNumber';
                        }

                        if (!values.name) {
                            errors.name = 'Please, provide product\'s name';
                        }

                        if (!values.company) {
                            errors.company = 'Please, provide product\'s company';
                        }

                        if (!values.description) {
                            errors.description = 'Please, provide product\'s description';
                        }

                        if (!values.image) {
                            errors.image = 'Please, provide product\'s image';
                        }

                        if (!values.price) {
                            errors.price = 'Please, provide product\'s price';
                        }

                        if (!values.discount) {
                            errors.discount = 'Please, provide product\'s discount';
                        }

                        if (!values.type) {
                            errors.type = 'Please, provide product\'s type';
                        }

                        if (!values.dateModify) {
                            errors.dateModify = 'Please, provide product\'s dateModify';
                        }

                        return errors;
                    }}
                />

                <UpdateForm
                    title="Product Update Process"
                    message="Update product"
                    trigger="Update"
                    onSubmit={product => service.update(product)}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};

                        if (!values.id) {
                            errors.id = 'Please, provide id';
                        }

                        if (!values.serialNumber) {
                            errors.serialNumber = 'Please, provide product\'s serialNumber';
                        }

                        if (!values.name) {
                            errors.name = 'Please, provide product\'s name';
                        }

                        if (!values.company) {
                            errors.company = 'Please, provide product\'s company';
                        }

                        if (!values.description) {
                            errors.description = 'Please, provide product\'s description';
                        }

                        if (!values.image) {
                            errors.image = 'Please, provide product\'s image';
                        }

                        if (!values.price) {
                            errors.price = 'Please, provide product\'s price';
                        }

                        if (!values.discount) {
                            errors.discount = 'Please, provide product\'s discount';
                        }

                        if (!values.type) {
                            errors.type = 'Please, provide product\'s type';
                        }

                        if (!values.dateModify) {
                            errors.dateModify = 'Please, provide product\'s dateModify';
                        }

                        return errors;
                    }}
                />

                <DeleteForm
                    title="Product Delete Process"
                    message="Are you sure you want to delete the product?"
                    trigger="Delete"
                    onSubmit={product => service.delete(product)}
                    submitText="Delete"
                    validate={(values) => {
                        const errors = {};
                        if (!values.id) {
                            errors.id = 'Please, provide id';
                        }
                        return errors;
                    }}
                />
            </CRUDTable>
        </div>
    );
}

Products.propTypes = {};

ReactDOM.render(
    <Products/>,
    document.getElementById('root')
);

export default Products;
