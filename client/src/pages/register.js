import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            arrUser: [],
            info: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    checkUser = () => {
        // Get users from database
        axios.get('/api/reg')
            .then(({ data }) => {

                this.setState({ arrUser: data })
                console.log(this.state)
            })
            .catch((error) => {
                alert('Error getting posts: ', error)
            })

    }

    handleChange = ({ target }) => {
        const { name, value } = target

        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    submit = (event) => {
        event.preventDefault()

        const payload = {
            username: this.state.username,
            password: this.state.password
        }


        // Get users from database
        axios({
            url: '/api/reg',
            method: 'POST',
            data: payload,
            timeout: 70000
        })
            .then((response) => {
    
                // Check if the username is already existed
                const isUserExist = response.data.isUserExist
                
                if (isUserExist === true) {
                    this.setState({ info: "The username is already exist" })
                } else {
                    this.setState({ info: "You have succesfully registered!" })

                    setInterval(() => {
                        window.location.href = '/';
                    }, 1000);
                    
                }

                console.log(this.state)
            })
            .catch((error) => {
                alert('Error getting users: ', error)
            })

    }


    render() {
        //JSX
        return (
            <div className="app">

                <div className="alert alert-info">
                    {this.state.info}
                    <form onSubmit={this.submit}>
                        <div className="form-input">
                            <input
                                required
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <input
                                required
                                type="text"
                                placeholder="password"
                                name="password"
                                onChange={this.handleChange}>
                            </input>
                        </div>

                        <button>Submit</button>
                    </form>

                </div>

            </div>
        )
    }

}

export default Register;
