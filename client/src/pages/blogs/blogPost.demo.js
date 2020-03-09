import React, { Component } from 'react';
import axios from 'axios'


import 'antd/dist/antd.css';

import displayBlogPost from './display.blog'
import BlogForm from './blogForm'
// const BlogContext = React.createContext()


class BlogPost extends Component {
    constructor(props){
        super(props)
        state = {
            title: '',
            body: '',
            posts: [],
            info: null,
            loading: false,
            iconLoading: false,
        }
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

    getBlogPost = () => axios.get('/api')

    handleChange = ({ target }) => {
        const { name, value } = target;
        console.log(this.state)
        console.log(target)
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

    resetUserInput = () => {
        this.setState({
            title: "",
            body: ""
        });
    }



    render() {
        const value = {

            title: this.state.title,
            body: this.state.body,
            info: this.state.info,
            loading: this.state.loading,
            iconLoading: this.state.iconLoading,
            submit: this.submit,
            handleChange: this.handleChange

        }
        //JSX
        return (
            <React.Fragment>
                <div className="app">

                    <BlogForm passvalue={value} />


                    {displayBlogPost(this.state.posts)}



                </div >
            </React.Fragment>
        )
    }

}

export default BlogPost;
