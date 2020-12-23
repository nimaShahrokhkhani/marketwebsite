import React from "react";
import {withTranslation} from "react-i18next";
import './NewCollection.css';
import AwesomeSlider from "react-awesome-slider";
import Services from "../../utils/Services";

class NewCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    getItems() {
        Services.getProductsNewCollectionList().then((response) => {
            console.log('new collections:', response.data)
            this.setState({
                items: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });

    }

    componentDidMount() {
        this.getItems()
    }

    render() {
        const {t} = this.props;
        return (
            <div className='newcollection-container'>

                <div className='collection-container'>
                    <AwesomeSlider className='collectionSlider'>
                        {
                            this.state.items.map((product, i) => {
                                return (
                                    <div data-index={i} key={i} className='new-collection-block-item'>
                                        <img
                                            src={Services.getProductImageDownloadUrl(product.image)}/>
                                        <p className='new-collection-product-name'>{product.name}</p>
                                        <div className='new-collection-price-container'>
                                            <p className='new-collection-product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                            <p className='new-collection-product-currency'>{t('currency')}</p>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </AwesomeSlider>
                </div>

            </div>
        );
    }
}

export default withTranslation()(NewCollection);
