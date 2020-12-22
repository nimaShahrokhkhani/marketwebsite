import React from "react";
import {withTranslation} from "react-i18next";
import './BlogListScreen.css';
import Services from "../../utils/Services";
import renderHTML from "react-render-html";

class BlogListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blogList: []
        }
    }

    getBlogList() {
        Services.getBlogList().then(response => {
            this.setState({
                blogList: response.data
            })
        }).catch(error => {

        })
    }

    componentDidMount() {
        this.getBlogList()
    }

    render() {
        const {t} = this.props;
        let {blogList} = this.state;
        return (
            <div className="blog_item_main">

                {blogList.map((blog, index) => (
                    <div className="blog_item" style={{borderBottomWidth: index === blogList.length - 1 && 0}}>

                        <div className="blog_content_container">
                            <h1>{blog.title}</h1>
                        <p>{renderHTML(blog.summeryContent)}</p>

                        </div>
                        <div className="blog_Image_container">
                            <img src={blog.contentImage}/>
                        </div>

                    </div>
                ))}
            </div>
        );
    }
}

export default withTranslation()(BlogListScreen);
