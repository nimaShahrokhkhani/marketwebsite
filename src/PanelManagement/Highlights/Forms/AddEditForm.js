import React, {Component, useMemo, useCallback} from 'react';
import {convertToRaw, EditorState, convertFromHTML, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddEditForm.css';
import Services from "../../../utils/Services";
import draftToHtml from 'draftjs-to-html';
import renderHTML from 'react-render-html';
import Slider from "react-slick/lib";
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';
import {Button, Input} from "reactstrap";
import htmlToDraft from 'html-to-draftjs';

class AddEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            summeryEditorState: EditorState.createEmpty(),
            markup: '',
            summeryMarkup: '',
            products: [],
            productsUse: [],
            previewImageSrc: undefined,
            title: '',
            id: ''
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
        console.log('summeryyyyyyy:', editorState)
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
        this.getItems();
        if (this.props.item) {
            console.log('itemmmmmm:', this.props.item)
            const summeryBlocksFromHtml = htmlToDraft(this.props.item.summeryContent);
            const summeryContentState = ContentState.createFromBlockArray(summeryBlocksFromHtml.contentBlocks, summeryBlocksFromHtml.entityMap);
            const summeryEditorState = EditorState.createWithContent(summeryContentState);

            const contentBlocksFromHtml = htmlToDraft(this.props.item.content);
            const contentState = ContentState.createFromBlockArray(contentBlocksFromHtml.contentBlocks, contentBlocksFromHtml.entityMap);
            const contentEditorState = EditorState.createWithContent(contentState);
            const {
                id,
                title,
                contentImage,
                products,
                summeryContent,
                content
            } = this.props.item;
            this.setState({
                id: id ? id : undefined,
                title: title ? title : '',
                previewImageSrc: contentImage ? contentImage : undefined,
                productsUse: products ? products : [],
                summeryEditorState: summeryContent ? summeryEditorState : '',
                editorState: content ? contentEditorState : '',
                summeryMarkup: draftToHtml(
                    convertToRaw(summeryEditorState.getCurrentContent())),
                markup: draftToHtml(
                    convertToRaw(contentEditorState.getCurrentContent()))
            })
        }
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
        console.log('iddddddd', this.state.id)
        if (this.state.id) {
            this.editHighlight();
        } else {
            this.addHighlight();
        }
    };

    addHighlight = () => {
        let dataObject = {
            'id': 'highlight' + Math.floor((Math.random() * 10000000000) + 1),
            'contentImage': this.state.previewImageSrc,
            'title': this.state.title,
            'products': this.state.productsUse,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.insertHighlight(dataObject).then(() => {
            this.props.getItems && this.props.getItems();
            this.props.toggle()
        }).catch((error) => {
            alert('error!!!')
        })
    };

    editHighlight = () => {
        let dataObject = {
            'id': this.state.id,
            'contentImage': this.state.previewImageSrc,
            'title': this.state.title,
            'products': this.state.productsUse,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.editHighlight(dataObject).then(() => {
            this.props.getItems && this.props.getItems();
            this.props.toggle()
        }).catch((error) => {
            alert('error!!!')
        })
    };

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
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
                <p className='choose-product-title'>Title</p>
                <Input value={this.state.title} onChange={this.onChangeTitle} type="text" id="title" name="title"/><br/>
                <p className='choose-product-title'>Upload Preview Image</p>
                {this.state.previewImageSrc ?
                    <div onClick={this.onRemoveHighlightImage} className='highlight-image-container'>
                        <div style={{
                            marginTop: -150
                        }}><img style={{
                            width: 40,
                            height: 40
                        }} src={require('../../../market/image/delete.png')}/></div>
                        <img height={200} id="target" src={this.state.previewImageSrc}/>
                    </div> :

                    <Dropzone onDrop={this.onDropCallback} accept={'image/*'}>
                        {({getRootProps, getInputProps}) => (
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <img src={require('../../../market/image/upload.png')}/>
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
                                                }} src={require('../../../market/image/delete.png')}/></div>
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
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alighnItems: 'center',
                    marginTop: 20,
                    marginBottom: 20
                }}>
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
            <img src={require("../../../market/image/arrow-right.png")}/>
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
            <img src={require("../../../market/image/arrow-left.png")}/>

        </div>
    );
}

export default AddEditForm;
