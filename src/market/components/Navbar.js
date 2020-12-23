import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {withTranslation, Trans} from 'react-i18next'
import Services from "../../utils/Services";
import AwesomeSlider from "react-awesome-slider";
import renderHTML from "react-render-html";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterCategories: [],
            categoryList: [],
            brandList: [],
            highlightList: [],
            blogList: [],
            eventTypeList: [],
            eventList: [],
            saleSliderList: []
        }
    }

    getCategoryList() {
        Services.getProductCategoryList().then(response => {
            this.setState({
                categoryList: response.data
            })
        }).catch(error => {

        })
    }

    getMasterCategories() {
        Services.getMasterCategoryList().then(response => {
            this.getCategoryList();
            this.setState({
                masterCategories: response.data
            })
        }).catch(error => {

        })
    }

    getBrandList() {
        Services.getBrandList().then(response => {
            this.setState({
                brandList: response.data
            })
        }).catch(error => {

        })
    }

    getHighlightList() {
        Services.getHighlightList().then(response => {
            this.setState({
                highlightList: response.data && response.data.length > 5 ? response.data.slice(Math.max(response.data.length - 5, 0)) : response.data
            })
        }).catch(error => {

        })
    }

    getBlogList() {
        Services.getBlogList().then(response => {
            this.setState({
                blogList: response.data && response.data.length > 5 ? response.data.slice(Math.max(response.data.length - 5, 0)) : response.data
            })
        }).catch(error => {

        })
    }

    getEventTypeList() {
        Services.getEventTypeList().then(response => {
            this.setState({
                eventTypeList: response.data
            })
        }).catch(error => {

        })
    }

    getEventList() {
        Services.getEventList().then(response => {
            this.setState({
                eventList: response.data
            })
        }).catch(error => {

        })
    }

    getSaleSliderImages() {
        Services.getSaleSliderList().then(response => {
            this.setState({
                saleSliderList: response.data
            })
        }).catch(error => {

        })
    }

    componentDidMount() {
        this.getMasterCategories();
        this.getBrandList();
        this.getHighlightList();
        this.getBlogList();
        this.getEventTypeList();
        this.getEventList();
        this.getSaleSliderImages();
    }

    closeMegaMenu() {
        document.getElementById("productsMenu").className += " no-hover";
        document.getElementById("brandMenu").className += " no-hover";
        document.getElementById("highlightMenu").className += " no-hover";
        document.getElementById("blogMenu").className += " no-hover";
        document.getElementById("eventMenu").className += " no-hover";
        setTimeout(() => {
            document.getElementById("productsMenu").className = document.getElementById("productsMenu").className.replace(/no-hover/g, '');
            document.getElementById("brandMenu").className = document.getElementById("brandMenu").className.replace(/no-hover/g, '');
            document.getElementById("highlightMenu").className = document.getElementById("highlightMenu").className.replace(/no-hover/g, '');
            document.getElementById("blogMenu").className = document.getElementById("blogMenu").className.replace(/no-hover/g, '');
            document.getElementById("eventMenu").className = document.getElementById("eventMenu").className.replace(/no-hover/g, '');
        }, 1500);
    }

    onMasterCategoryClick = (masterCategory) => {
        this.closeMegaMenu();
        this.props.history.replace({
            pathname: '/Market/Products',
            state: {
                masterCategory
            }
        });
    };

    onTypeClick = (masterCategory, type) => {
        this.closeMegaMenu();
        this.props.history.replace({
            pathname: '/Market/Products',
            state: {
                masterCategory,
                type
            }
        });
    };

    onSubCategoryClick = (masterCategory, type, subType) => {
        this.closeMegaMenu();
        this.props.history.replace({
            pathname: '/Market/Products',
            state: {
                masterCategory,
                type,
                subType
            }
        });
    };

    onHighlightMenuClick = () => {
        this.closeMegaMenu();
        this.props.history.push({
            pathname: '/Market/HighlightListScreen'
        });
    };

    onBlogMenuClick = () => {
        this.closeMegaMenu();
        this.props.history.push({
            pathname: '/Market/BlogListScreen'
        });
    };

    onHighlightReadMoreClick = (highlight) => {
        this.closeMegaMenu();
        this.props.history.push({
            pathname: '/Market/Highlight',
            state: {highlight: highlight}
        });
    };

    onBlogReadMoreClick = (blog) => {
        this.closeMegaMenu();
        this.props.history.push({
            pathname: '/Market/Blog',
            state: {blog: blog}
        });
    };

    renderBrandMenu() {
        const {brandList} = this.state;
        let resultView = [];
        for (let i = 0; i < brandList.length; i += 4) {
            let view = <div className="ruby-col-4 ruby-col-6-md">
                <ul>
                    {brandList[i] &&
                    <li><a className='brandItem' style={{fontFamily: 'IRANSansMobileFaNum-Bold'}} href="#"><img style={{width: 50, height: 50}} src={Services.getBrandImageDownloadUrl(brandList[i].image)}/><p>{brandList[i].name}</p></a></li>
                    }
                    {brandList[i + 1] &&
                    <li><a className='brandItem' style={{fontFamily: 'IRANSansMobileFaNum-Bold'}} href="#"><img style={{width: 50, height: 50}} src={Services.getBrandImageDownloadUrl(brandList[i + 1].image)}/><p>{brandList[i + 1].name}</p></a></li>
                    }
                    {brandList[i + 2] &&
                    <li><a className='brandItem' style={{fontFamily: 'IRANSansMobileFaNum-Bold'}} href="#"><img style={{width: 50, height: 50}} src={Services.getBrandImageDownloadUrl(brandList[i + 2].image)}/><p>{brandList[i + 2].name}</p></a></li>
                    }
                    {brandList[i + 3] &&
                    <li><a className='brandItem' style={{fontFamily: 'IRANSansMobileFaNum-Bold'}} href="#"><img style={{width: 50, height: 50}} src={Services.getBrandImageDownloadUrl(brandList[i + 3].image)}/>{brandList[i + 3].name}</a></li>
                    }
                </ul>
            </div>;
            resultView.push(view)
        }
        return(
            <div className="ruby-row">
                {resultView}
            </div>
        );
    }

    render() {
        const pathname = this.props.location.pathname;
        const {t} = this.props;
        const {masterCategories, categoryList, highlightList, eventTypeList, eventList, blogList, saleSliderList} = this.state;
        return (
            <div className="ruby-menu-demo-header">
                <div className="ruby-wrapper">
                    <button className="c-hamburger c-hamburger--htx visible-xs">
                        <span>toggle menu</span>
                    </button>
                    <ul className="ruby-menu" style={{display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-start'}}>
                        <li className="ruby-active-menu-item"><a href="/Market">خانه</a></li>

                        <li id="productsMenu" className="ruby-menu-mega-shop"><a href="#">محصولات</a>
                            <div style={{height: 500, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-end'}} className="">
                                    <AwesomeSlider className='saleSlider'>
                                        {saleSliderList && saleSliderList.map(saleSlider => (
                                            <div>
                                                <img style={{height: 500}} src={Services.getSliderImageDownloadUrl(saleSlider.image)}/>
                                            </div>
                                        ))}
                                    </AwesomeSlider>

                                <ul>
                                    {masterCategories && masterCategories.map((masterCategory, index) => (
                                        <li><a onClick={() => this.onMasterCategoryClick(masterCategory.name)} style={{fontFamily: 'IRANSansMobile-Bold', cursor: 'pointer'}}>{masterCategory.name}</a>
                                            <div className="ruby-grid ruby-grid-lined">
                                                <div className="ruby-row ruby-row-products">
                                                    {categoryList && categoryList.filter(category => category.masterCategory === masterCategory.name).map(categoryItem => (
                                                        <div className="ruby-col-12">
                                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #c0c0c0'}}>
                                                                <img style={{width: 50, height: 50, borderRadius: 25, marginRight: 5, marginLeft: 5}} src={Services.getProductCategoryImageDownloadUrl(categoryItem.image)}/>
                                                                <h3 className="ruby-list-heading"
                                                                    style={{marginTop: 5}}><a style={{cursor: 'pointer'}} onClick={() => this.onTypeClick(masterCategory.name, categoryItem.type)}>{categoryItem.type}</a></h3>
                                                            </div>

                                                            <ul>
                                                                {categoryItem.subTypes && categoryItem.subTypes.split(',').map(subType => (
                                                                    <li><a onClick={() => this.onSubCategoryClick(masterCategory.name, categoryItem.type, subType)} style={{fontFamily:'IRANSansMobile-Light', cursor: 'pointer'}}>{subType}</a></li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="ruby-dropdown-toggle"></span></li>
                                    ))}
                                </ul>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li id="brandMenu" className="ruby-menu-mega"><a href="#">برند ها</a>
                            <div className="ruby-grid ruby-grid-lined">
                                <div className="ruby-row">
                                    <div className="ruby-col-5">
                                        {this.renderBrandMenu()}
                                    </div>
                                </div>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li id="highlightMenu" className="ruby-menu-mega-blog"><a onClick={this.onHighlightMenuClick}>هایلایت</a>
                            <div style={{height: 269.359}} className="">
                                <ul className="ruby-menu-mega-blog-nav">

                                    <li className="ruby-active-menu-item">
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                {highlightList && highlightList.map(highlight => (
                                                    <div className="ruby-col-3">
                                                        <img src={highlight.contentImage}/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">هایلایت</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a style={{cursor: 'pointer'}} onClick={() => this.onHighlightReadMoreClick(highlight)}>{highlight.title}</a></span>
                                                        <span className="ruby-c-content">{renderHTML(highlight.summeryContent)}</span>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>

                                </ul>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li id="eventMenu" className="ruby-menu-mega-blog"><a href="#">رویدادها</a>
                            <div style={{height: 269.359}} className="">
                                <ul className="ruby-menu-mega-blog-nav" style={{width: 200}}>

                                    {eventTypeList && eventTypeList.map((eventType, index) => (
                                        <li class={index === 0 && "ruby-active-menu-item"}><a href="#">{eventType.name}</a>
                                            <div className="ruby-grid ruby-grid-lined" style={{height: 264.359, left: 200, width: 1000}}>
                                                <div className="ruby-row">

                                                    {eventList && eventList.filter(event => event.type === eventType.name).map(event => (
                                                        <div className="ruby-col-3">
                                                            <img src={Services.getEventImageDownloadUrl(event.image)}/>
                                                            <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">{eventType.name}</a></span>
                                                                <span className="ruby-c-date"><a
                                                                    href="#">{event.dateModify}</a></span>
                                                            </div>
                                                            <span className="ruby-c-title ruby-margin-10"><a href="#">{event.title}</a></span>
                                                            <span className="ruby-c-content">{event.description}</span>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                            <span className="ruby-dropdown-toggle"></span></li>

                                        ))}


                                </ul>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li id="blogMenu" className="ruby-menu-mega-blog"><a onClick={this.onBlogMenuClick}>بلاگ</a>
                            <div style={{height: 269.359}} className="">
                                <ul className="ruby-menu-mega-blog-nav">

                                    <li className="ruby-active-menu-item">
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                {blogList && blogList.map(blog => (
                                                    <div className="ruby-col-3">
                                                        <img src={blog.contentImage}/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">بلاگ</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a  style={{cursor: 'pointer'}} onClick={() => this.onBlogReadMoreClick(blog)}>{blog.title}</a></span>
                                                        <span className="ruby-c-content">{renderHTML(blog.summeryContent)}</span>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>

                                </ul>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li><a href="/Market/ContactUs">تماس با ما</a></li>

                    </ul>
                </div>

            </div>
        )
    }
}

export default withTranslation()(withRouter(Navigation));
