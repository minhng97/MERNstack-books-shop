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
        axios.get('/api/reg')
            .then(({ data }) => {

                // Check if the username is already existed
                const isUserInDatabase = data.some(checkUser)


                if (isUserInDatabase === true) {
                    this.setState({ info: "The username is already exist" })
                } else {
                    // Save item to database
                    axios({
                        url: '/api/reg',
                        method: 'POST',
                        data: payload
                    })
                        .then(() => {
                            console.log('data has been sent to server');
                            this.setState({ info: "You have succesfully registered!" })

                            setInterval(() => {
                                window.location.href = '/';
                            }, 1000);

                        })
                        .catch(() => {
                            this.setState({ info: "500 server error when send the data" })
                        })
                }

                function checkUser(element) {
                    return (element.username === payload.username)
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
