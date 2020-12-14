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
import './masterCategories.css';

const DescriptionRenderer = ({field}) => <textarea {...field} />;

let masterCategories = [
    {
        id: 1,
        type: '',
        description: '',
        moreInformation: ''

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


let count = masterCategories.length;
const service = {
    fetchItems: (productList, payload) => {
        let result = productList ? Array.from(productList) : [];
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result);
    },
    create: (product) => {
        count += 1;
        masterCategories.push({
            ...product,
            id: count,
        });
        return Promise.resolve(product);
    },
    update: (data) => {
        const product = masterCategories.find(t => t.type === data.type);
        product.type = data.type;
        product.description = data.description;
        product.moreInformation = data.moreInformation;
        return Promise.resolve(product);
    },
    delete: (data) => {
        const product = masterCategories.find(t => t.type === data.type);
        masterCategories = masterCategories.filter(t => t.id !== product.id);
        return Promise.resolve(product);
    },
};

const styles = {
    container: {margin: 'auto', width: 'fit-content', marginTop: 20},
};

const ProductCategories = ({productCategoryList}) => {
    let productCategoryListTemp = [];
    useEffect(() => {
        productCategoryListTemp = productCategoryList
    }, [productCategoryList]);
    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Products"
                fetchItems={payload => service.fetchItems(productCategoryListTemp, payload)}
            >
                <Fields>
                    <Field
                        name="id"
                        label="Id"
                        hideInCreateForm
                    />
                    <Field
                        name="type"
                        label="Type"
                        placeholder="Type"
                        type="text"
                    />
                    <Field
                        name="description"
                        label="Description"

                    />
                    <Field
                        name="moreInformation"
                        label="MoreInformation"

                    />
                </Fields>
                <CreateForm
                    title="Product Category Creation"
                    message="Create a new product category!"
                    trigger="Add product category"
                    onSubmit={product => service.create(product)}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.type) {
                            errors.type = 'Please, provide product category\'s type';
                        }

                        if (!values.description) {
                            errors.description = 'Please, provide product category\'s description';
                        }

                        if (!values.moreInformation) {
                            errors.moreInformation = 'Please, provide product category\'s moreInformation';
                        }

                        return errors;
                    }}
                />

                <UpdateForm
                    title="Product Category Update Process"
                    message="Update product category"
                    trigger="Update"
                    onSubmit={product => service.update(product)}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};

                        if (!values.type) {
                            errors.type = 'Please, provide product category\'s type';
                        }

                        if (!values.description) {
                            errors.description = 'Please, provide product category\'s description';
                        }

                        if (!values.moreInformation) {
                            errors.moreInformation = 'Please, provide product category\'s moreInformation';
                        }

                        return errors;
                    }}
                />

                <DeleteForm
                    title="Product Category Delete Process"
                    message="Are you sure you want to delete the product category?"
                    trigger="Delete"
                    onSubmit={product => service.delete(product)}
                    submitText="Delete"
                    validate={(values) => {
                        const errors = {};
                        if (!values.type) {
                            errors.tpe = 'Please, provide typeZ';
                        }
                        return errors;
                    }}
                />
            </CRUDTable>
        </div>
    );
}

ProductCategories.propTypes = {};

ReactDOM.render(
    <ProductCategories/>,
    document.getElementById('root')
);

export default ProductCategories;
