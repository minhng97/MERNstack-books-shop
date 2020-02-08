import React, { Component } from 'react';
import axios from 'axios'
import {
    ListGroup, ListGroupItem
    , Form, Input, FormGroup, Label
} from 'reactstrap';
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

import displayBlogPost from './displayContent/display.blog'

class BlogPost extends Component {
    state = {
        title: '',
        body: '',
        posts: [],
        info: null,
        loading: false,
        iconLoading: false,
    }

    componentDidMount() {
        this.getBlogPost()
    }

    getBlogPost = () => {
        // Get posts from database
        axios.get('/api')
            .then(({ data }) => {
                // Deep copy
                const reverseData = [];
                for (let i = data.length - 1; i >= 0; i--) {
                    reverseData.push(data[i]);
                }

                this.setState({
                    posts: reverseData
                })
                console.log("The posts have been loaded")
            })
            .catch((error) => {
                alert('Error getting posts: ', error)
            })
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
        // Save item to database
        axios({
            url: '/api/save',
            method: 'POST',
            data: payload,
            headers: { "authorization": `Bearer ${localStorage.getItem("token")}` }
        })
            .then(() => {

                setInterval(() => {
                    this.setState(() => ({ info: null }))
                }, 1200);
                this.resetUserInput();
                this.getBlogPost();
                this.enterIconLoading()
                this.enterLoading()
            })
            .catch(() => {
                this.setState({ info: "500 internal error" })
                this.enterIconLoading()
                this.enterLoading()
            })
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
                {/* // Warning */}
                {this.state.info}

                <Form onSubmit={this.submit} style={{
                    border: "1px solid lightgray",
                    width: "auto",
                    padding: "10px",
                    borderRadius: "4px",
                    backgroundColor: "#d3d3d32e"}}>
                    <div style={{padding: "10px", width: "50%"}}>
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

            <div className="posts">
                <ListGroup>
                    {displayBlogPost(this.state.posts)}
                </ListGroup>
            </div>


            </div >
        )
    }

}

export default BlogPost;
