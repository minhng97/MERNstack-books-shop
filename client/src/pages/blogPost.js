import React, { Component } from 'react';
import axios from 'axios'
import {
    ListGroup, ListGroupItem,
    Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

class BlogPost extends Component {
    state = {
        title: '',
        body: '',
        posts: [],
        info: null
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

    submit = (event) => {
        event.preventDefault()

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

                this.setState({ info: "Posted successful!" })
                setInterval(() => {
                    this.setState(() => ({ info: null }))
                }, 1200);
                this.resetUserInput();
                this.getBlogPost();
            })
            .catch(() => {
                this.setState({ info: "500 internal error" })
            })
    }

    resetUserInput = () => {
        this.setState({
            title: "",
            body: ""
        });
    }

    displayBlogPost = (posts) => {

        if (!posts.length) return null;

        return posts.map(post => <ListGroupItem
            className="blog-post__display">
            <h6>{post.title}</h6>
            <p>{post.body}</p>
        </ListGroupItem>
        )
    }

    render() {
        //JSX
        return (
            <div className="app">

                {this.state.info}
                <Form onSubmit={this.submit}>
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

                    <button>Submit</button>
                </Form>

                <div className="posts">
                    <ListGroup>
                        {this.displayBlogPost(this.state.posts)}
                    </ListGroup>
                </div>


            </div>
        )
    }

}

export default BlogPost;
