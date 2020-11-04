import React from 'react';
import './Products.css';
import {withTranslation} from 'react-i18next'

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div style={{marginTop: 116}}>

            </div>
        );
    }
}

export default withTranslation()(Products);
