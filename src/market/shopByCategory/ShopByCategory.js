import React from "react";
import {withTranslation} from "react-i18next";
import './ShopByCategory.css';
import Services from "../../utils/Services";

class ShopByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    getCategoryList() {
        Services.getProductCategoryList({isCandidate: 'true'}).then(response => {
            this.setState({
                categoryList: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getCategoryList();
    }


    render() {
        return (
            <div className="category-container">
                <div className='category-groups'>
                    <div className='category-groups-child'>
                        {this.state.categoryList[0] &&
                        <div className='item-container'>
                            <img src={Services.getProductCategoryImageDownloadUrl(this.state.categoryList[0].image)}/>
                            <div className='name-container'>
                                <p className='category-title'>{this.state.categoryList[0].type}</p>
                            </div>
                        </div>
                        }
                        {this.state.categoryList[1] &&
                        <div className='item-container'>
                            <img src={Services.getProductCategoryImageDownloadUrl(this.state.categoryList[1].image)}/>
                            <div className='name-container'>
                                <p className='category-title'>{this.state.categoryList[1].type}</p>
                            </div>
                        </div>
                        }
                    </div>
                    <div className='category-groups-child'>
                        {this.state.categoryList[2] &&
                        <div className='item-container'>
                            <img src={Services.getProductCategoryImageDownloadUrl(this.state.categoryList[2].image)}/>
                            <div className='name-container'>
                                <p className='category-title'>{this.state.categoryList[2].type}</p>
                            </div>
                        </div>
                        }
                    </div>
                    <div className='category-groups-child'>
                        {this.state.categoryList[3] &&
                        <div className='item-container'>
                            <img src={Services.getProductCategoryImageDownloadUrl(this.state.categoryList[3].image)}/>
                            <div className='name-container'>
                                <p className='category-title'>{this.state.categoryList[3].type}</p>
                            </div>
                        </div>
                        }
                        {this.state.categoryList[4] &&
                        <div className='item-container'>
                            <img src={Services.getProductCategoryImageDownloadUrl(this.state.categoryList[4].image)}/>
                            <div className='name-container'>
                                <p className='category-title'>{this.state.categoryList[4].type}</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ShopByCategory);
