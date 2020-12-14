import React, {Component, useMemo, useCallback} from 'react';
import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './BlogManager.css';
import Services from "../../utils/Services";
import draftToHtml from 'draftjs-to-html';
import renderHTML from 'react-render-html';
import Slider from "react-slick/lib";
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';
import {Button} from "reactstrap";

class BlogManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            summeryEditorState: EditorState.createEmpty(),
            markup: '',
            summeryMarkup: '',
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
            Services.uploadBlogImage(data).then((response) => {
                resolve({data: {link: Services.getBlogImageDownloadUrl(response.data)}})
            })
        })
    };

    componentDidMount() {
    }

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
        let dataObject = {
            'id': 'blog' + Math.floor((Math.random() * 10000000000) + 1),
            'contentImage': this.state.previewImageSrc,
            'content': this.state.markup,
            'summeryContent': this.state.summeryMarkup
        };
        Services.insertBlog(dataObject).then(() => {
            alert('saved successfully!!!')
        }).catch((error) => {
            alert('error!!!')
        })
    };

    render() {
        const {editorState, summeryEditorState} = this.state;
        return (
            <div className='highlight-container'>
                <p className='choose-product-title'>Upload Preview Image</p>
                {this.state.previewImageSrc ?
                    <div onClick={this.onRemoveBlogImage} className='highlight-image-container'>
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

export default BlogManager;
