import React, {Component, useMemo, useCallback} from 'react';
import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './HighlightManager.css';
import Services from "../../utils/Services";
import draftToHtml from 'draftjs-to-html';
import renderHTML from 'react-render-html';
import Slider from "react-slick/lib";
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';
import {Button} from "reactstrap";

class HighlightsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            summeryEditorState: EditorState.createEmpty(),
            markup: '',
            summeryMarkup: '',
            products: [],
            productsUse: [],
            previewImageSrc: undefined
        };
        this.markup = '';
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            markup: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
            )
        });
    };

    onSummeryEditorStateChange = (editorState) => {
        this.setState({
            summeryEditorState: editorState,
            summeryMarkup: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
            )
        });
    };

    uploadImage = (image) => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('file', image);
            Services.uploadHighlightImage(data).then((response) => {
                resolve({data: {link: Services.getHighlightImageDownloadUrl(response.data)}})
            })
        })
    };

    getItems() {
        Services.getProductsList().then((response) => {
            this.setState({
                products: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });

    }

    componentDidMount() {
        this.getItems()
    }

    onProductClick = (product) => {
        this.state.productsUse.push(product);
        this.setState({
            productsUse: this.state.productsUse
        })
    };

    deleteFromProductUse = (product) => {
        this.state.productsUse = this.state.productsUse.filter(function (el) {
            return el.serialNumber !== product.serialNumber;
        });
        this.setState({
            productsUse: this.state.productsUse
        })
    };

    onDropCallback = (files) => {
        const data = new FormData();
        data.append('file', files[0]);
        Services.uploadHighlightImage(data).then((response) => {
            this.setState({
                previewImageSrc: Services.getHighlightImageDownloadUrl(response.data)
            })
        })
    };

    onRemoveHighlightImage = () => {
        this.setState({
            previewImageSrc: undefined
        })
    };

    onSubmitClick = () => {
        let dataObject = {
            'id': 'highlight' + Math.floor((Math.random() * 10000000000) + 1),
            'contentImage': this.state.previewImageSrc,
            'products': this.state.productsUse,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.insertHighlight(dataObject).then(() => {
            alert('saved successfully!!!')
        }).catch((error) => {
            alert('error!!!')
        })
    };

    render() {
        const {editorState, summeryEditorState} = this.state;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        const settingsUse = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        return (
            <div className='highlight-container'>
                <p className='choose-product-title'>Upload Preview Image</p>
                {this.state.previewImageSrc ?
                    <div onClick={this.onRemoveHighlightImage} className='highlight-image-container'>
                        <div style={{
                            marginTop: -150
                        }}><img style={{
                            width: 40,
                            height: 40
                        }} src={require('../../market/image/delete.png')}/></div>
                        <img width={200} height={200} id="target" src={this.state.previewImageSrc}/>
                    </div> :

                    <Dropzone onDrop={this.onDropCallback} accept={'image/*'}>
                        {({getRootProps, getInputProps}) => (
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <img src={require('../../market/image/upload.png')}/>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                }
                <p className='choose-product-title'>Summery Content</p>
                <div style={{
                    marginTop: 20
                }}>
                    <Editor
                        editorState={summeryEditorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onSummeryEditorStateChange}
                        toolbar={{
                            fontFamily: {
                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'IRANSansMobile']
                            },
                            image: {
                                uploadEnabled: false
                            }
                        }}
                    />
                </div>
                <p className='choose-product-title'>Content</p>
                <div style={{
                    marginTop: 20
                }}>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            fontFamily: {
                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'IRANSansMobile']
                            },
                            image: {
                                uploadEnabled: true,
                                uploadCallback: this.uploadImage,
                                previewImage: true
                            }
                        }}
                    />
                </div>
                <div>
                    <p className='choose-product-title'>Choose Products</p>
                    {this.state.products.length > 0 ?
                        <div className='slider-container'>
                            <Slider {...settings}>
                                {
                                    this.state.products.map((product, i) => {
                                        return (
                                            <div onClick={() => this.onProductClick(product)} data-index={i} key={i}
                                                 className='highlight-block-item'>
                                                <img
                                                    src={Services.getProductImageDownloadUrl(product.image)}/>
                                                <p className='product-name'>{product.name}</p>
                                            </div>
                                        )
                                    })

                                }

                            </Slider>
                        </div> : null}
                </div>
                {this.state.productsUse.length > 0 ?
                    <div>
                        <p className='choose-product-title'>Products Candidate</p>
                        <div className='slider-container'>
                            <Slider {...settingsUse}>
                                {
                                    this.state.productsUse.map((product, i) => {
                                        return (
                                            <div data-index={i} key={i} className='highlight-block-item'>
                                                <div onClick={() => this.deleteFromProductUse(product)} style={{
                                                    width: '100%'
                                                }}><img style={{
                                                    width: 40,
                                                    height: 40
                                                }} src={require('../../market/image/delete.png')}/></div>
                                                <img
                                                    src={Services.getProductImageDownloadUrl(product.image)}/>
                                                <p className='product-name'>{product.name}</p>
                                            </div>
                                        )
                                    })

                                }

                            </Slider>
                        </div>
                    </div> : null}
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alighnItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <Button
                        color='success'
                        onClick={this.onSubmitClick}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", width: 50, height: 50}}
            onClick={onClick}
        >
            <img src={require("../../market/image/arrow-right.png")}/>
        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", width: 50, height: 50}}
            onClick={onClick}
        >
            <img src={require("../../market/image/arrow-left.png")}/>

        </div>
    );
}

export default HighlightsManager;
