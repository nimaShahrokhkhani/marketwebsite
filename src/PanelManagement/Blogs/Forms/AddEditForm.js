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
            Services.uploadBlogImage(data).then((response) => {
                resolve({data: {link: Services.getBlogImageDownloadUrl(response.data)}})
            })
        })
    };

    componentDidMount() {
        if (this.props.item) {
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
                summeryContent,
                content
            } = this.props.item;
            this.setState({
                id: id ? id : undefined,
                title: title ? title : '',
                previewImageSrc: contentImage ? contentImage : undefined,
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
        Services.uploadBlogImage(data).then((response) => {
            this.setState({
                previewImageSrc: Services.getBlogImageDownloadUrl(response.data)
            })
        })
    };

    onRemoveBlogImage = () => {
        this.setState({
            previewImageSrc: undefined
        })
    };

    onSubmitClick = () => {
        if (this.state.id) {
            this.editBlog();
        } else {
            this.addBlog();
        }
    };

    addBlog = () => {
        let dataObject = {
            'id': 'blog' + Math.floor((Math.random() * 10000000000) + 1),
            'contentImage': this.state.previewImageSrc,
            'title': this.state.title,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.insertBlog(dataObject).then(() => {
            this.props.getItems && this.props.getItems();
            this.props.toggle()
        }).catch((error) => {
            alert('error!!!')
        })
    };

    editBlog = () => {
        let dataObject = {
            'id': this.state.id,
            'contentImage': this.state.previewImageSrc,
            'title': this.state.title,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.editBlog(dataObject).then(() => {
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
        return (
            <div className='highlight-container'>
                <p className='choose-product-title'>Title</p>
                <Input value={this.state.title} onChange={this.onChangeTitle} type="text" id="title" name="title"/><br/>
                <p className='choose-product-title'>Upload Preview Image</p>
                {this.state.previewImageSrc ?
                    <div onClick={this.onRemoveBlogImage} className='highlight-image-container'>
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

export default AddEditForm;
