import React from 'react';
import './Products.css';
import {withTranslation} from 'react-i18next'
import './style/animate.css';
import './style/main.css';
import './style/price-range.css';
import './style/reset.css';
import './style/responsive.css';
import Services from "../../utils/Services";
import ScreenLoading from "../../components/screenLoading/ScreenLoading";
import {Container, Row, Col} from "react-bootstrap";
import Collapsible from 'react-collapsible';
import Slider from '@material-ui/core/Slider';
import connect from "react-redux/es/connect/connect";
import {addProduct, setState} from "../../components/redux/actions";
import Pagination from "react-js-pagination";

class Products extends React.Component {

    constructor(props) {
        super(props);
        let {products, isFromSearch} = this.props.location.state ? this.props.location.state : {};
        this.totalItemsShowOnScreen = 36;
        this.state = {
            isLoading: false,
            isDone: false,
            productList: [],
            totalProductsCount: 0,
            brandList: [],
            fromRangeValue: 0,
            toRangeValue: 1000000,
            search: '',
            brand: '',
            productCategoryList: [],
            activePage: 0,
            activeQuickFilter: ''
        }
    }

    getItems = (offset, length, masterCategory, type, subType) => {
        this.setState({
            isLoading: true,
            isDone: false
        }, () => {
            Services.getProductsList({
                offset: offset,
                length: length,
                masterCategory,
                type,
                subType
            }).then((response) => {
                this.setState({
                    productList: response.data.data,
                    totalProductsCount: response.data.totalCount,
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
        })
    };

    onProductClick = (product) => {
        this.props.history.push({
            pathname: '/Market/ProductDetail',
            state: {product: product}
        });
    };

    componentDidMount() {
        let {products, isFromSearch, masterCategory, type, subType} = this.props.location.state ? this.props.location.state : {};
        isFromSearch ?
            this.setState({
                isLoading: true,
                isDone: false
            }, () => {
                this.setState({
                    productList: products,
                    isLoading: false
                });
                setTimeout(() => {
                    this.setState({isDone: true});
                }, 1000);
            }) : this.getItems(0, this.totalItemsShowOnScreen, masterCategory, type, subType);
        Services.getBrandList().then(response => {
            this.setState({
                brandList: response.data
            });
        }).catch(error => {
            console.log('error', error);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {products, masterCategory} = this.props.location.state ? this.props.location.state : {};
        Services.getProductCategoryList({masterCategory}).then(response => {
            this.setState({
                productCategoryList: response.data
            })
        }).catch(error => {
            console.log('error', error);
        });
        if (products && products !== this.state.productList) {
            this.setState({
                productList: products
            })
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            fromRangeValue: newValue[0],
            toRangeValue: newValue[1],
        })
    };

    handleSearchChange = (e) => {
        this.setState({search: e.target.value});
    };

    _handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            Services.searchProductsList({name: this.state.search}).then((response) => {
                this.props.history.push({
                    pathname: '/Market/Products',
                    state: {
                        products: response.data,
                        isFromSearch: true
                    }
                });
            })
        }
    };

    handleBrandSearchChange = (e) => {
        this.setState({brand: e.target.value});
    };

    _handleBrandSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            Services.searchProductsList({brand: this.state.brand}).then((response) => {
                this.props.history.push({
                    pathname: '/Market/Products',
                    state: {
                        products: response.data,
                        isFromSearch: true
                    }
                });
            })
        }
    };

    handlePageChange = (pageNumber) => {
        let {masterCategory, type, subType} = this.props.location.state ? this.props.location.state : {};
        this.setState({
            activePage: pageNumber
        }, () => {
            this.getItems((pageNumber - 1) * this.totalItemsShowOnScreen, this.totalItemsShowOnScreen, masterCategory, type, subType);
        });
    };

    onBrandClick = (brandName) => {
        Services.searchProductsList({brand: brandName}).then((response) => {
            this.props.history.push({
                pathname: '/Market/Products',
                state: {
                    products: response.data,
                    isFromSearch: true
                }
            });
        })
    };

    onTypeClick = (type) => {
        let {masterCategory} = this.props.location.state ? this.props.location.state : {};
        this.getItems(0, this.totalItemsShowOnScreen, masterCategory, type);
    };

    onSubTypeClick = (type, subType) => {
        let {masterCategory} = this.props.location.state ? this.props.location.state : {};
        this.getItems(0, this.totalItemsShowOnScreen, masterCategory, type, subType);
    };

    addToShoppingCart = (event, product) => {
        event.stopPropagation();
        this.props.addProduct(product)
    };

    onQuickFilterClick = (filter) => {
        this.setState({activeQuickFilter: filter})
    };

    render() {
        const {t} = this.props;
        let {masterCategory, type, subType} = this.props.location.state ? this.props.location.state : {};
        let {isLoading, isDone, productList, brandList, productCategoryList, activeQuickFilter} = this.state;
        return (
            <div style={{
                marginTop: 150,
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                alighnItems: 'center',
                justifyContent: 'center'
            }}>
                {isDone && !isLoading ?
                    <section>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-9 padding-right">
                                    <div class="features_items">
                                        <h2 class="title text-center">??????????????</h2>
                                        <div className="filter_container">
                                            <p>???????? ???????? :</p>
                                            <div className={activeQuickFilter === "????????????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('????????????????')}>????????????????</a>
                                            </div>
                                            <div className={activeQuickFilter === "?????????????? ??????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('?????????????? ??????????')}>??????????????
                                                    ??????????</a>
                                            </div>
                                            <div className={activeQuickFilter === "???????????? ??????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('???????????? ??????????')}>????????????
                                                    ??????????</a>
                                            </div>
                                            <div className={activeQuickFilter === "???????????? ????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('???????????? ????????')}>????????????
                                                    ????????</a>
                                            </div>
                                            <div className={activeQuickFilter === "?????????????? ????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('?????????????? ????????')}>??????????????
                                                    ????????</a>
                                            </div>
                                            <div className={activeQuickFilter === "?????????????? ????????" && "active"}>
                                                <a onClick={() => this.onQuickFilterClick('?????????????? ????????')}>??????????????
                                                    ????????</a>
                                            </div>
                                        </div>
                                        <Container>
                                            <Row>

                                                {
                                                    productList && productList.map((product, i) => {
                                                        return (
                                                            <Col sm={4}>
                                                                <div className="product-image-wrapper">
                                                                    <div className="single-products"
                                                                         onClick={() => this.onProductClick(product)}>
                                                                        <div className="productinfo text-center">
                                                                            <div className='category-block-item'>
                                                                                <img
                                                                                    src={Services.getProductImageDownloadUrl(product.image)}/>
                                                                                <p className='product-name'>{product.name}</p>
                                                                                <div className='price-container'>
                                                                                    <p className='product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                                                    <p className='product-currency'>{t('currency')}</p>
                                                                                </div>
                                                                                <p className='product-brand'>{product.brand}</p>
                                                                            </div>
                                                                            <a onClick={(event) => this.addToShoppingCart(event, product)}
                                                                               className="btn btn-default add-to-cart"><i
                                                                                className="fa fa-shopping-cart"></i>????????????
                                                                                ????
                                                                                ?????? ????????</a>
                                                                        </div>
                                                                        {product.discount !== "0" &&
                                                                        <div className="product-overlay">
                                                                            <div className="overlay-content">
                                                                                <div className='price-container'>
                                                                                    <h2 className='product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                                                                                    <h2 className='product-currency'>{t('currency')}</h2>
                                                                                </div>
                                                                                <p className='product-name'>{product.name}</p>
                                                                                <a onClick={(event) => this.addToShoppingCart(event, product)}
                                                                                   className="btn btn-default add-to-cart"><i
                                                                                    className="fa fa-shopping-cart"></i>????????????
                                                                                    ???? ?????? ????????</a>
                                                                            </div>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    <div className="choose">
                                                                        <ul className="nav-choose nav-pills nav-justified">
                                                                            <li><a href=""><i
                                                                                className="fa fa-plus-square"></i>??????????
                                                                                ???? ??????????
                                                                                ????????</a>
                                                                            </li>
                                                                            <li><a href=""><i
                                                                                className="fa fa-plus-square"></i>????????????
                                                                                ????????</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </Container>


                                        <div class="products-pagination">
                                            <Pagination
                                                hideDisabled
                                                activePage={this.state.activePage}
                                                itemsCountPerPage={3}
                                                totalItemsCount={this.state.totalProductsCount}
                                                pageRangeDisplayed={5}
                                                onChange={this.handlePageChange}
                                                totalRecords={this.state.totalProductsCount}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="left-sidebar">
                                        <h2>???????? ???????? ??????????????</h2>
                                        <div class="category-products-list" id="accordian">

                                            {
                                                productCategoryList && productCategoryList.map(productCategory => {
                                                    return (
                                                        <Collapsible open={type === productCategory.type} trigger={
                                                            <div className='category-parent-row'>
                                                                <p onClick={() => this.onTypeClick(productCategory.type)}
                                                                   style={{cursor: 'pointer'}}>{productCategory.type}</p>
                                                                <img width='50px' height='50px'
                                                                     src={Services.getProductCategoryImageDownloadUrl(productCategory.image)}/>
                                                            </div>
                                                        } className='product-category-parent'>
                                                            {
                                                                productCategory.subTypes && productCategory.subTypes.split(',').map(subTypeItem => {
                                                                    return (
                                                                        <p style={{backgroundColor: subType === subTypeItem && 'rgb(1 249 180 / 35%)'}} onClick={() => this.onSubTypeClick(productCategory.type, subTypeItem)}
                                                                           className='collapsible-child'>{subTypeItem}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Collapsible>
                                                    )
                                                })
                                            }

                                        </div>
                                        <h2>??????????</h2>
                                        <div class="search_box pull-right">
                                            <input type="text" placeholder="?????? ?????????? ???? ???????? ???????? ??????"
                                                   value={this.state.search} onChange={(e) => {
                                                this.handleSearchChange(e)
                                            }} onKeyDown={this._handleSearchKeyDown}/>
                                        </div>

                                        <br/><br/>

                                        <div class="brands_products">

                                            <h2>????????</h2>
                                            <div class="search_box pull-right">
                                                <input type="text" placeholder="???????????? ?????? ????????"
                                                       value={this.state.brand} onChange={(e) => {
                                                    this.handleBrandSearchChange(e)
                                                }} onKeyDown={this._handleBrandSearchKeyDown}/>
                                            </div>
                                            <br/><br/>
                                            <div class="brands-name">
                                                <ul class="nav nav-pills nav-stacked brand-list">

                                                    {
                                                        brandList && brandList.map((brand, i) => {
                                                            return (
                                                                <li onClick={() => this.onBrandClick(brand.name)}
                                                                    className='brand-row'><img width='50px'
                                                                                               height='30px'
                                                                                               src={Services.getBrandImageDownloadUrl(brand.image)}/>
                                                                    <p>{brand.name}</p></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="price-range">
                                            <h2>?????? ????????</h2>
                                            <div class="well">
                                                <Slider
                                                    value={[this.state.fromRangeValue, this.state.toRangeValue]}
                                                    onChange={this.handleChange}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="range-slider"
                                                    min={1000}
                                                    max={1000000}
                                                    marks={false}
                                                /><br/>
                                                <b></b> <b class="pull-right"></b>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>

                    </section> :
                    <ScreenLoading
                        loading={isLoading}
                        done={isDone}/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const products = state.products;
    return {products};
};

export default connect(mapStateToProps, {addProduct, setState})(withTranslation()(Products));
