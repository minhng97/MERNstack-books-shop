import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import {
    Form, Input
} from 'reactstrap';
import Button from 'antd/es/button';
const axios = require('axios')

// import BlogContext from './blogPost'
const areEqual = (prevProps, nextProps) => true;
const BlogForm = React.memo((props) => {
    const [title, handleChangeTitle] = useState('')
    const [body, handleChangeBody] = useState('')
    const [info, setInfo] = useState('')
    const [loading, enterLoading] = useState(false)
    const [iconLoading, enterIconLoading] = useState(false)

    console.log("BlogForm Rendered")
    const onHandleChangeTitle = ({ target }) => {
        const { name, value } = target;
        console.log('title: ', title)
        console.log(target)
        handleChangeTitle(value)
    }
    const onHandleChangeBody = ({ target }) => {
        const { name, value } = target;
        console.log('body: ', body)
        console.log(target)
        handleChangeBody(value)
    }

    const submit = (event) => {
        event.preventDefault()
        enterIconLoading(!iconLoading)
        enterLoading(!loading)
        const payload = {
            title: title,
            body: body,
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
                    setInfo(null)
                }, 1200);

                resetUserInput();

                let { data } = await getBlogPost();

                enterIconLoading(!iconLoading)
                enterLoading(!loading)
                if(data) {document.location.href = "/"}
            })
            .catch(() => {
                setInfo(("500 internal error"))

                enterIconLoading(!iconLoading)
                enterLoading(!loading)
            })
    }

    const resetUserInput = () => {
        onHandleChangeTitle("");
        onHandleChangeBody("")
    }
    const getBlogPost = () => {
        // Get posts from database
        return axios.get('/api')
    }


    return (
        <React.Fragment>
            {info}
            <Form
                onSubmit={submit}
                style={{
                    border: "1px solid lightgray",
                    width: "auto",
                    padding: "10px",
                    borderRadius: "4px",
                    backgroundColor: "#d3d3d32e"
                }}>

                <div style={{ padding: "10px", width: "50%" }}>
                    <div className="form-input">
                        <Input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={onHandleChangeTitle}
                        />
                    </div>

                    <div className="form-input">
                        <textarea
                            placeholder="body"
                            name="body"
                            rows="3"
                            value={body}
                            onChange={onHandleChangeBody}>
                        </textarea>
                    </div>

                    <Button type="primary" loading={loading} onClick={submit}>
                        Submit
                        </Button>
                </div>

            </Form>
        </React.Fragment>
    )
}, areEqual)

export default BlogForm