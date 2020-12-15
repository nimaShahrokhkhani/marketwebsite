import React from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {withTranslation, Trans} from 'react-i18next'
import Services from "../../utils/Services";
import AwesomeSlider from "react-awesome-slider";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterCategories: [],
            categoryList: []
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

    componentDidMount() {
        this.getMasterCategories();
    }

    render() {
        const pathname = this.props.location.pathname;
        const {t} = this.props;
        const {masterCategories, categoryList} = this.state;
        return (
            <div className="ruby-menu-demo-header">
                <div className="ruby-wrapper">
                    <button className="c-hamburger c-hamburger--htx visible-xs">
                        <span>toggle menu</span>
                    </button>
                    <ul className="ruby-menu" style={{display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-start'}}>
                        <li className="ruby-active-menu-item"><a href="#">خانه</a></li>

                        <li className="ruby-menu-mega-shop"><a href="#">محصولات</a>
                            <div style={{height: 500, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-end'}} className="">
                                    <AwesomeSlider className='saleSlider'>
                                        <div>
                                            <img style={{height: 500}} src={require('../image/takhfif1.jpg')}/>
                                        </div>
                                        <div>
                                            <img style={{height: 500}} src={require('../image/takhfif2.jpg')}/>
                                        </div>
                                        <div>
                                            <img style={{height: 500}} src={require('../image/takhfif3.jpg')}/>
                                        </div>
                                    </AwesomeSlider>

                                <ul>
                                    {masterCategories && masterCategories.map((masterCategory, index) => (
                                        <li><a href="#" style={{fontFamily: 'IRANSansMobile-Bold'}}>{masterCategory.name}</a>
                                            <div className="ruby-grid ruby-grid-lined">
                                                <div className="ruby-row ruby-row-products">
                                                    {categoryList && categoryList.filter(category => category.masterCategory === masterCategory.name).map(categoryItem => (
                                                        <div className="ruby-col-3">
                                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                                <h3 className="ruby-list-heading"
                                                                    style={{marginTop: 16}}>{categoryItem.type}</h3>
                                                                <img style={{width: 50, height: 50, borderRadius: 25, marginRight: 5, marginLeft: 5}} src={Services.getProductCategoryImageDownloadUrl(categoryItem.image)}/>
                                                            </div>

                                                            <ul>
                                                                {categoryItem.subTypes && categoryItem.subTypes.split(',').map(subType => (
                                                                    <li><a href="#" style={{fontFamily:'IRANSansMobile-Light'}}>{subType}</a></li>
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

                        <li><a href="#">Classic</a>
                            <ul className="">
                                <li><a href="#">2nd Level #1</a></li>
                                <li><a href="#">2nd Level #2</a></li>
                                <li><a href="#">2nd Level #3</a>
                                    <ul>
                                        <li><a href="#"><i className="fa fa-university" aria-hidden="true"></i>3rd Level
                                            #1</a>
                                            <ul>
                                                <li><a href="#">4th Level #1</a></li>
                                                <li><a href="#">4th Level #2</a></li>
                                            </ul>
                                            <span className="ruby-dropdown-toggle"></span></li>
                                        <li><a href="#"><i className="fa fa-thumbs-up" aria-hidden="true"></i>3rd Level
                                            #2</a></li>
                                        <li><a href="#"><i className="fa fa-users" aria-hidden="true"></i>3rd Level
                                            #3</a>
                                            <ul>
                                                <li><a href="#"><i className="fa fa-paper-plane" aria-hidden="true"></i>4th
                                                    Level #1</a></li>
                                                <li><a href="#"><i className="fa fa-print" aria-hidden="true"></i>4th
                                                    Level #2</a></li>
                                                <li><a href="#"><i className="fa fa-shopping-bag"
                                                                   aria-hidden="true"></i>4th Level #3</a></li>
                                            </ul>
                                            <span className="ruby-dropdown-toggle"></span></li>
                                    </ul>
                                    <span className="ruby-dropdown-toggle"></span></li>
                                <li className="ruby-open-to-left"><a href="#">2nd Level #4</a>
                                    <ul>
                                        <li><a href="#">3rd Level #1</a></li>
                                        <li><a href="#">3rd Level #2</a></li>
                                        <li><a href="#">3rd Level #3</a></li>
                                    </ul>
                                    <span className="ruby-dropdown-toggle"></span></li>
                                <li><a href="#">2nd Level #5</a></li>
                            </ul>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li className="ruby-menu-mega"><a href="#">Mega</a>
                            <div className="ruby-grid ruby-grid-lined">
                                <div className="ruby-row">
                                    <div className="ruby-col-2">
                                        <h3 className="ruby-list-heading">Normal List</h3>
                                        <ul>
                                            <li><a href="#">Menu Item #1</a></li>
                                            <li><a href="#">Menu Item #2</a></li>
                                            <li><a href="#">Menu Item #3</a></li>
                                            <li><a href="#">Menu Item #4</a></li>
                                            <li><a href="#">Menu Item #5</a></li>
                                        </ul>
                                    </div>
                                    <div className="ruby-col-2 hidden-md">
                                        <h3 className="ruby-list-heading">List with Icons</h3>
                                        <ul>
                                            <li><a href="#"><i className="fa fa-motorcycle" aria-hidden="true"></i>Menu
                                                Item #1</a></li>
                                            <li><a href="#"><i className="fa fa-music" aria-hidden="true"></i>Menu Item
                                                #2</a></li>
                                            <li><a href="#"><i className="fa fa-shopping-cart" aria-hidden="true"></i>Menu
                                                Item #3</a></li>
                                            <li><a href="#"><i className="fa fa-sliders" aria-hidden="true"></i>Menu
                                                Item #4</a></li>
                                            <li><a href="#"><i className="fa fa-search" aria-hidden="true"></i>Menu Item
                                                #5</a></li>
                                        </ul>
                                    </div>
                                    <div className="ruby-col-3 ruby-col-4-md">
                                        <h3 className="ruby-list-heading">List with Images + Desc</h3>
                                        <ul className="ruby-list-with-images">
                                            <li><a href="#"><img src="img/c-1.png"/>Menu Item #1</a><span
                                                className="ruby-list-desc">Lorem ipsum dolor sit</span></li>
                                            <li><a href="#"><img src="img/c-2.png"/>Menu Item #2</a><span
                                                className="ruby-list-desc">Lorem ipsum dolor sit</span></li>
                                            <li><a href="#"><img src="img/c-3.png"/>Menu Item #3</a><span
                                                className="ruby-list-desc">Lorem ipsum dolor sit</span></li>
                                        </ul>
                                    </div>
                                    <div className="ruby-col-5">
                                        <h3 className="ruby-list-heading">Multiple Lists with Icons</h3>
                                        <div className="ruby-row">
                                            <div className="ruby-col-4 ruby-col-6-md">
                                                <ul>
                                                    <li><a href="#"><i className="fa fa-star" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-signal" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-send" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-thumbs-o-up"
                                                                       aria-hidden="true"></i>Menu Item</a></li>
                                                </ul>
                                            </div>
                                            <div className="ruby-col-4 ruby-col-6-md" style={{paddingLeft:10}}>
                                                <ul>
                                                    <li><a href="#"><i className="fa fa-rocket" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-warning" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-upload" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-umbrella"
                                                                       aria-hidden="true"></i>Menu Item</a></li>
                                                    <li><a href="#"><i className="fa fa-trophy" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                </ul>
                                            </div>
                                            <div className="ruby-col-4 hidden-md" style={{paddingLeft:15}}>
                                                <ul>
                                                    <li><a href="#"><i className="fa fa-map-o" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-image" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-legal" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                    <li><a href="#"><i className="fa fa-paint-brush"
                                                                       aria-hidden="true"></i>Menu Item</a></li>
                                                    <li><a href="#"><i className="fa fa-heart" aria-hidden="true"></i>Menu
                                                        Item</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                        <li className="ruby-menu-mega-blog"><a href="#">Blog</a>
                            <div style={{height: 269.359}} className="">
                                <ul className="ruby-menu-mega-blog-nav">

                                    <li className="ruby-active-menu-item"><a href="#">Blog-4-Column</a>
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                <div className="ruby-col-3">
                                                    <img src="http://brienlabs.com/ruby-mega-menu/img/travel-1.jpg"/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">News / Travel</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a href="#">Vacation Proved To Increase Productivity</a></span>
                                                        <span className="ruby-c-content">The primary research for the study was based on an online survey that was...</span>
                                                </div>
                                                <div className="ruby-col-3">
                                                    <img src="http://brienlabs.com/ruby-mega-menu/img/health-3.jpg"/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">News / Health</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a href="#">Stereotype Idioms By The Smokers</a></span>
                                                        <span className="ruby-c-content">If you have ever said some of below idioms you are for sure a smoking...</span>
                                                </div>
                                                <div className="ruby-col-3">
                                                    <img src="http://brienlabs.com/ruby-mega-menu/img/culture-2.jpg"/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">News / Culture</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a href="#">10 Facts About The Philosophers</a></span>
                                                        <span className="ruby-c-content">When we think “philosopher,” a certain image comes to mind—most often a wise...</span>
                                                </div>
                                                <div className="ruby-col-3">
                                                    <img src="http://brienlabs.com/ruby-mega-menu/img/health-2.jpg"/>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a
                                                                href="#">News / Tech</a></span>
                                                            <span className="ruby-c-date"><a
                                                                href="#">05/01/2017</a></span>
                                                        </div>
                                                        <span className="ruby-c-title ruby-margin-10"><a href="#">In 2016, 10 People Died While Taking Selfie</a></span>
                                                        <span className="ruby-c-content">This is a list of serious injuries and deaths in which the victim or a member of...</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>

                                    <li className="hidden-md"><a href="#">Blog-3-Column</a>
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-1.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">An Erupting Volcano And A Meteor</a></span>
                                                        <span className="ruby-c-category"><a href="#">News / Science</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-2.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">Bottle Labels: Short Stories To Read</a></span>
                                                        <span className="ruby-c-category"><a href="#">News / Culture</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-3.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">10+ Stunning Animal Portraits By Polyushko</a></span>
                                                        <span className="ruby-c-category"><a
                                                            href="#">News / Photography</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ruby-row">
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-8.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">Photographing The Beauty Of Fall</a></span>
                                                        <span className="ruby-c-category"><a
                                                            href="#">News / Photography</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-9.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">10 Freaking Facts About Being A Pilot</a></span>
                                                        <span className="ruby-c-category"><a
                                                            href="#">News / Life</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-4">
                                                    <div className="ruby-col-5">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-10.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-7">
                                                        <span className="ruby-c-title"><a href="#">Health Benefits Of A Glass Of Whiskey</a></span>
                                                        <span className="ruby-c-category"><a href="#">News / Health</a></span>
                                                        <span className="ruby-c-date"><a href="#">05/01/2017</a></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>

                                    <li><a href="#">Blog-2-Column</a>
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                <div className="ruby-col-6">
                                                    <div className="ruby-col-4">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-4.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-8">
                                                        <span className="ruby-c-title"><a href="#">Nexo Created New Airless Bike Tires That Will Never Get Flat</a></span>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a href="#"><i
                                                                className="fa fa-tag" aria-hidden="true"></i> News / Tech</a></span>
                                                            <span className="ruby-c-date"><a href="#"><i
                                                                className="fa fa-calendar" aria-hidden="true"></i> 05/01/2017</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-6">
                                                    <div className="ruby-col-4">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-5.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-8">
                                                        <span className="ruby-c-title"><a href="#">Illustrator Creates Stunning Dresses From Everyday Objects</a></span>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a href="#"><i
                                                                className="fa fa-tag" aria-hidden="true"></i> News / Tech</a></span>
                                                            <span className="ruby-c-date"><a href="#"><i
                                                                className="fa fa-calendar" aria-hidden="true"></i> 05/01/2017</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ruby-row">
                                                <div className="ruby-col-6">
                                                    <div className="ruby-col-4">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-6.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-8">
                                                        <span className="ruby-c-title"><a href="#">Italian Pastry Chef Creates Miniature Worlds With Desserts</a></span>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a href="#"><i
                                                                className="fa fa-tag" aria-hidden="true"></i> News / Tech</a></span>
                                                            <span className="ruby-c-date"><a href="#"><i
                                                                className="fa fa-calendar" aria-hidden="true"></i> 05/01/2017</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-6">
                                                    <div className="ruby-col-4">
                                                        <img src="http://brienlabs.com/ruby-mega-menu/img/blog-7.jpg"/>
                                                    </div>
                                                    <div className="ruby-col-8">
                                                        <span className="ruby-c-title"><a href="#">Dogs Brought To The Lavender Gardens To Capture Their Joy</a></span>
                                                        <div className="ruby-c-inline">
                                                            <span className="ruby-c-category"><a href="#"><i
                                                                className="fa fa-tag" aria-hidden="true"></i> News / Tech</a></span>
                                                            <span className="ruby-c-date"><a href="#"><i
                                                                className="fa fa-calendar" aria-hidden="true"></i> 05/01/2017</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>

                                    <li><a href="#">Blog-Article-List</a>
                                        <div className="ruby-grid ruby-grid-lined" style={{height: 264.359}}>
                                            <div className="ruby-row">
                                                <div className="ruby-col-6">
                                                    <span className="ruby-c-title" style={{marginBottom:15}}>POPULAR THREADS</span>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-1.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">An Erupting Volcano And A Meteor Has Created A Fantastic View</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-2.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">Bottle Labels With Short Stories To Be Read Is The New Marketing Era</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-3.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">10+ Stunning Animal Portraits That Has Been Filmed By Polyushko</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-10.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">10 Freaking Facts About Being An airline pilot</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ruby-col-6">
                                                    <span className="ruby-c-title" style={{marginBottom:15}}>MOST COMMENTED</span>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-1.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">An Erupting Volcano And A Meteor Has Created A Fantastic View</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-2.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">Bottle Labels With Short Stories To Be Read Is The New Marketing Era</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-3.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">10+ Stunning Animal Portraits That Has Been Filmed By Polyushko</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="ruby-row">
                                                        <div className="ruby-col-1"><img src="img/blog-10.jpg"/></div>
                                                        <div className="ruby-col-11"><span className="ruby-c-title"><a
                                                            href="#">10 Freaking Facts About Being An airline pilot</a></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="ruby-dropdown-toggle"></span></li>
                                </ul>
                            </div>
                            <span className="ruby-dropdown-toggle"></span></li>

                    </ul>
                </div>

            </div>
        )
    }
}

export default withTranslation()(withRouter(Navigation));
