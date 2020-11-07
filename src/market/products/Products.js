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
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import connect from "react-redux/es/connect/connect";
import {addProduct, setState} from "../../components/redux/actions";

class Products extends React.Component {

    constructor(props) {
        super(props);
        let {products, isFromSearch} = this.props.location.state ? this.props.location.state : {};
        this.state = {
            isLoading: false,
            isDone: false,
            productList: [],
            fromRangeValue: 20,
            toRangeValue: 37
        }
    }

    getItems = () => {
        this.setState({
            isLoading: true,
            isDone: false
        }, () => {
            //setTimeout(() => {
            Services.getProductsList().then((response) => {
                this.setState({
                    productList: response.data,
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
            //}, 2000);
        })
    };

    onProductClick = (product) => {
        this.props.history.push({
            pathname: '/Market/ProductDetail',
            state: {product: product}
        });
    };

    componentDidMount() {
        let {products, isFromSearch} = this.props.location.state ? this.props.location.state : {};
        console.log(this.props.location.state)
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
            }) : this.getItems();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {products, isFromSearch} = this.props.location.state ? this.props.location.state : {};
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

    addToShoppingCart = (event, product) => {
        event.stopPropagation();
        this.props.addProduct(product)
    };

    render() {
        const {t} = this.props;
        let {isLoading, isDone, productList} = this.state;
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
                                        <h2 class="title text-center">محصولات</h2>
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
                                                                            <img
                                                                                src={Services.getProductImageDownloadUrl(product.image)}
                                                                                alt=""/>
                                                                            <div className='price-container'>
                                                                                <h2 className='product-price'>{product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                                                                                <h2 className='product-currency'>{t('currency')}</h2>
                                                                            </div>
                                                                            <p className='product-name'>{product.name}</p>
                                                                            <a onClick={(event) => this.addToShoppingCart(event, product)}
                                                                               className="btn btn-default add-to-cart"><i
                                                                                className="fa fa-shopping-cart"></i>افزودن
                                                                                به
                                                                                سبد خرید</a>
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
                                                                                    className="fa fa-shopping-cart"></i>افزودن
                                                                                    به سبد خرید</a>
                                                                            </div>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    <div className="choose">
                                                                        <ul className="nav-choose nav-pills nav-justified">
                                                                            <li><a href=""><i
                                                                                className="fa fa-plus-square"></i>اضافه
                                                                                به علاقه
                                                                                مندی</a>
                                                                            </li>
                                                                            <li><a href=""><i
                                                                                className="fa fa-plus-square"></i>مقایسه
                                                                                کردن</a>
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


                                        <ul class="pagination">
                                            <li class="active"><a href="">1</a></li>
                                            <li><a href="">2</a></li>
                                            <li><a href="">3</a></li>
                                            <li><a href="">&raquo;</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="left-sidebar">
                                        <h2>دسته بندی محصولات لب</h2>
                                        <div class="panel-group category-products" id="accordian">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">
                                                        <a data-toggle="collapse" data-parent="#accordian"
                                                           href="#sportswear">
                                                            <span class="badge pull-right"><i
                                                                class="fa fa-plus"></i></span>
                                                            لوازم آرایشی
                                                        </a>
                                                    </h4>

                                                </div>
                                                <div id="sportswear" class="panel-collapse collapse">
                                                    <div class="panel-body">
                                                        <ul>
                                                            <li><a href="">چشم </a></li>
                                                            <li><a href="">رژ لب </a></li>
                                                            <li><a href="">مداد </a></li>
                                                            <li><a href="">ناخن</a></li>
                                                            <li><a href="">قلم مو </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">
                                                        <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                                            <span class="badge pull-right"><i
                                                                class="fa fa-plus"></i></span>
                                                            رژ لب مایع
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div id="mens" class="panel-collapse collapse">
                                                    <div class="panel-body">
                                                        <ul>
                                                            <li><a href="">سفید</a></li>
                                                            <li><a href="">آبی</a></li>
                                                            <li><a href="">قهوه ای</a></li>
                                                            <li><a href="">قرمز</a></li>
                                                            <li><a href="">صورتی</a></li>
                                                            <li><a href="">بنفش</a></li>
                                                            <li><a href="">خاکستری</a></li>
                                                            <li><a href="">الماسی</a></li>
                                                            <li><a href="">ارغوانی</a></li>
                                                            <li><a href="">انابی</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">
                                                        <a data-toggle="collapse" data-parent="#accordian"
                                                           href="#womens">
                                                            <span class="badge pull-right"><i
                                                                class="fa fa-plus"></i></span>
                                                            مداد لب
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div id="womens" class="panel-collapse collapse">
                                                    <div class="panel-body">
                                                        <ul>
                                                            <li><a href="">قرمز</a></li>
                                                            <li><a href="">آبی</a></li>
                                                            <li><a href="">صورتی</a></li>
                                                            <li><a href="">سفید</a></li>
                                                            <li><a href="">مشکی</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title"><a href="#">رژ لب مدادی</a></h4>
                                                </div>
                                            </div>
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title"><a href="#">رژ لب جامد</a></h4>
                                                </div>
                                            </div>

                                        </div>
                                        <h2>جستجو</h2>
                                        <div class="search_box pull-right">
                                            <input type="text" placeholder="نام محصول یا برند مورد نظر"/>
                                        </div>

                                        <br/><br/>

                                        <div class="brands_products">

                                            <h2>برند</h2>
                                            <div class="search_box pull-right">
                                                <input type="text" placeholder="جستجوی نام برند"/>
                                            </div>
                                            <br/><br/>
                                            <div class="brands-name">
                                                <ul class="nav nav-pills nav-stacked">

                                                    <li><a href=""> <span class="pull-right"></span>Heduabcuty</a></li>
                                                    <li><a href=""> <span class="pull-right"></span></a></li>
                                                    <li><a href=""> <span class="pull-right"></span>My</a></li>
                                                    <li><a href=""> <span class="pull-right"></span>Inly</a></li>
                                                    <li><a href=""> <span class="pull-right"></span>Oddmolly</a></li>
                                                    <li><a href=""> <span class="pull-right"></span>Boudestijn</a></li>
                                                    <li><a href=""> <span class="pull-right"></span>Rösch creative
                                                        culture</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="price-range">
                                            <h2>رنج قیمت</h2>
                                            <div class="well">
                                                <Slider
                                                    value={[this.state.fromRangeValue, this.state.toRangeValue]}
                                                    onChange={this.handleChange}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="range-slider"
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
