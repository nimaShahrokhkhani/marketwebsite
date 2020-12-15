import React, {Component, useMemo, useCallback} from 'react';
import './SliderManager.css';
import {Button} from "reactstrap";
import Services from "../../utils/Services";

class SliderManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerName: undefined,
            bannerTemp: undefined,
            saleName: undefined,
            saleTemp: undefined,
            bannerSlider: [],
            saleSlider: []
        };
    }

    onChangeName = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onChangeImage = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    addBannerSlider = () => {
        let bannerImage = this.state.bannerTemp;
        let bannerName = this.state.bannerName;
        if (bannerName && bannerImage) {
            const data = new FormData();
            data.append('file', bannerImage);
            data.append('name', bannerName);
            Services.insertBannerSlider(data).then((response) => {
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            });
        }
    };

    addSaleSlider = () => {
        let saleImage = this.state.saleTemp;
        let saleName = this.state.saleName;
        if (saleName && saleImage) {
            const data = new FormData();
            data.append('file', saleImage);
            data.append('name', saleName);
            Services.insertSaleSlider(data).then((response) => {
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            });
        }
    };

    removeBanner = (banner) => {
        Services.deleteBannerSlider({name: banner.name}).then((response) => {
            this.setState({
                bannerSlider: this.state.bannerSlider.filter(bannerItem => bannerItem.name !== banner.name)
            })
        }).catch((error) => {
            console.log('error is:', error)
        });
    };

    removeSale = (sale) => {
        Services.deleteSaleSlider({name: sale.name}).then((response) => {
            this.setState({
                saleSlider: this.state.saleSlider.filter(saleItem => saleItem.name !== sale.name)
            })
        }).catch((error) => {
            console.log('error is:', error)
        });
    };

    getBannerSlider = () => {
        Services.getBannerSliderList().then((response) => {
            this.setState({
                bannerSlider: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });
    };

    getSaleSlider = () => {
        Services.getSaleSliderList().then((response) => {
            this.setState({
                saleSlider: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });
    };

    componentDidMount() {
        this.getBannerSlider();
        this.getSaleSlider();
    }

    render() {
        const {bannerSlider, saleSlider} = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{marginTop: 100, fontSize: 25, color: '#100f8a'}}>Banner Slider</p>
                <div className="sliderForm">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <input type="file" name="bannerTemp" className="todo_input" onChange={this.onChangeImage}/>
                        <input type="text" className="bannerName" name="bannerName" placeholder="Banner name" onChange={this.onChangeName}/>
                    </div>
                    <button onClick={this.addBannerSlider} className="todo_button">
                        <i className="fas fa-plus-square"> + </i>
                    </button>
                </div>
                <div className="todo_container">
                    <ul className="todo_list">
                        {bannerSlider.length > 0 && bannerSlider.map(banner => (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img style={{width: 500, height: 200}} src={Services.getSliderImageDownloadUrl(banner.image)}/>
                                <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 100}} onClick={() => this.removeBanner(banner)}>
                                    <img style={{
                                        width: 40,
                                        height: 40
                                    }} src={require('../../market/image/delete.png')}/>
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>

                <p style={{marginTop: 100, fontSize: 25, color: '#100f8a'}}>Sale Slider</p>
                <div className="sliderForm">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <input type="file" name="saleTemp" className="todo_input" onChange={this.onChangeImage}/>
                        <input type="text" className="bannerName" name="saleName" placeholder="Sale name" onChange={this.onChangeName}/>
                    </div>
                    <button onClick={this.addSaleSlider} className="todo_button">
                        <i className="fas fa-plus-square"> + </i>
                    </button>
                </div>
                <div className="todo_container">
                    <ul className="todo_list" style={{marginBottom: 200}}>
                        {saleSlider.length > 0 && saleSlider.map(sale => (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img style={{width: 500, height: 200}} src={Services.getSliderImageDownloadUrl(sale.image)}/>
                                <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 100}} onClick={() => this.removeSale(sale)}>
                                    <img style={{
                                        width: 40,
                                        height: 40
                                    }} src={require('../../market/image/delete.png')}/>
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SliderManager;
