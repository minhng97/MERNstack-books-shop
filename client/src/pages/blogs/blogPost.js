import React, { Component } from 'react';
import axios from 'axios'
import { Form, Input } from 'reactstrap';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

import displayBlogPost from './display.blog'

class BlogPost extends Component {
    state = {
        title: '',
        body: '',
        posts: [],
        info: null,
        loading: false,
        iconLoading: false,
    }

    async componentDidMount() {
        try {
            let { data } = await this.getBlogPost()

            this.setState({ posts: data.reverse() })
        }
        catch (error) {
            alert("Error ", error)
        }
    }

    getBlogPost = () => {
        // Get posts from database
        return axios.get('/api')
    }

    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({
            [name]: value
        })
    }
    enterLoading = () => {
        this.setState({ loading: !this.state.loading });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: !this.state.iconLoading });
    };
    submit = (event) => {
        event.preventDefault()
        this.enterIconLoading()
        this.enterLoading()
        const payload = {
            title: this.state.title,
            body: this.state.body,
            token: localStorage.getItem("token")
        }
        if (this.state.title.trim() === '' || this.state.body.trim() === '') {
            this.setState({
                info: "Please input title and body"
            })
            this.setState(() => ({ loading: false }))
            this.setState(() => ({ iconLoading: false }))

        }
        else {
            // Save item to database
            axios({
                url: '/api/save',
                method: 'POST',
                data: payload,
                headers: { "authorization": `Bearer ${localStorage.getItem("token")}` }
            })
                .then(async () => {

                    setInterval(() => {
                        this.setState(() => ({ info: null }))
                    }, 1200);

                    this.resetUserInput();

                    let { data } = await this.getBlogPost();
                    this.setState(state => ({ posts: data.reverse() }))

                    this.enterIconLoading()
                    this.enterLoading()
                })
                .catch(() => {
                    this.setState(state => ({ info: "500 internal error" }))

                    this.enterIconLoading()
                    this.enterLoading()
                })
        }
    }

    resetUserInput = () => {
        this.setState({
            title: "",
            body: ""
        });
    }



    render() {
        //JSX
        return (
            <div className="app">

                {this.state.info}

                <Form onSubmit={this.submit} style={formStyle}>
                    <div style={divFormStyle}>
                        <div className="form-input">
                            <Input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                placeholder="body"
                                name="body"
                                rows="3"
                                value={this.state.body}
                                onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <Button type="primary" loading={this.state.loading} onClick={this.submit}>
                            Submit
                        </Button>
                    </div>

                </Form>

                {displayBlogPost(this.state.posts)}




            </div >
        )
    }

}

const formStyle = {
    border: "1px solid lightgray",
    width: "auto",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#d3d3d32e"
}
const divFormStyle = { padding: "10px", width: "50%" }
export default BlogPost;
