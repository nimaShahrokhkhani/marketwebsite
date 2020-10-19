import React from 'react';
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
import './Companies.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let users = [
    {
        id: 1,
        Username: '',
        Password: '',
        Role: 'Create an example',
        BirthDay: 'Create an example',
        Company: 'Create an example',
        Email: 'Create an example',
        PhoneNumber: 'Create an example',

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


let count = users.length;
const service = {
    fetchItems: (payload) => {
        let result = Array.from(users);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result);
    },
    create: (user) => {
        count += 1;
        users.push({
            ...user,
            id: count,
        });
        return Promise.resolve(user);
    },
    update: (data) => {
        const user = users.find(t => t.id === data.id);
        user.title = data.title;
        user.description = data.description;
        return Promise.resolve(user);
    },
    delete: (data) => {
        const user = users.find(t => t.id === data.id);
        users = users.filter(t => t.id !== user.id);
        return Promise.resolve(user);
    },
};

const styles = {
    container: { margin: 'auto', width: 'fit-content', marginTop: 20 },
};

const Companies = () => (
    <div style={styles.container}>
        <CRUDTable
            caption="Users"
            fetchItems={payload => service.fetchItems(payload)}
        >
            <Fields>
                <Field
                    name="id"
                    label="Id"
                    hideInCreateForm
                />
                <Field
                    name="Username"
                    label="UserName"
                    placeholder="Username"
                />
                <Field
                    name="Password"
                    label="PassWord"

                />
                <Field
                    name="role"
                    label="Role"

                />
                <Field
                    name="Birthday"
                    label="BirthDay"

                />
                <Field
                    name="company"
                    label="Company"

                />
                <Field
                    name="email"
                    label="Email"

                />
                <Field
                    name="Phonenumber"
                    label="PhoneNumber"

                />
            </Fields>
            <CreateForm
                title="User Creation"
                message="Create a new user!"
                trigger="Add user"
                onSubmit={user => service.create(user)}
                submitText="Create"
                validate={(values) => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Please, provide user\'s title';
                    }

                    if (!values.description) {
                        errors.description = 'Please, provide user\'s description';
                    }

                    return errors;
                }}
            />

            <UpdateForm
                title="User Update Process"
                message="Update user"
                trigger="Update"
                onSubmit={user => service.update(user)}
                submitText="Update"
                validate={(values) => {
                    const errors = {};

                    if (!values.id) {
                        errors.id = 'Please, provide id';
                    }

                    if (!values.title) {
                        errors.title = 'Please, provide user\'s title';
                    }

                    if (!values.description) {
                        errors.description = 'Please, provide user\'s description';
                    }

                    return errors;
                }}
            />

            <DeleteForm
                title="User Delete Process"
                message="Are you sure you want to delete the user?"
                trigger="Delete"
                onSubmit={user => service.delete(user)}
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

Companies.propTypes = {};

ReactDOM.render(
    <Companies />,
    document.getElementById('root')
);

export default Companies;
