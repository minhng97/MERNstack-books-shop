import React, { Component } from 'react';
import axios from 'axios'
import Button from 'antd/es/button';
import 'antd/dist/antd.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            arrUser: [],
            info: "",
            loading: false,
            iconLoading: false,
        }
    }

    checkUser = () => {
        // Get users from database
        axios.get('/api/reg')
            .then(({ data }) => {
                this.setState({ arrUser: data })
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
    }
    changeLoading = () => {
        this.enterLoading()
        this.enterIconLoading()
    }
    enterLoading = () => {
        this.setState({ loading: !this.state.loading });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: !this.state.iconLoading });
    };
    submit = (event) => {
        event.preventDefault()
        this.changeLoading()
        const payload = {
            username: this.state.username,
            password: this.state.password
        }

        if (payload.username !== '' && payload.password !== '') {
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

                    if (isUserExist === false) {
                        this.setState({ info: "You have succesfully registered!" })
                        setInterval(() => {
                            window.location.href = '/log'
                        }, 1000);
                    } else {
                        this.setState({ info: "The username is already exist" })
                        this.changeLoading()
                    }
                })
                .catch((error) => {
                    alert('Error getting users: ', error)
                })
        } else {
            this.setState((state) =>
                ({
                    info: "Please enter username and password",
                    iconLoading: !state.iconLoading,
                    loading: !state.loading
                })
            )
        }
    }


    render() {
        //JSX
        return (
            <div className="app">

                <div className="alert alert-success">
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

                        <Button type="primary" loading={this.state.loading} style={{ backgroundColor: "#18cc3e", border: "1px solid #18cc3e" }} onClick={this.submit}>
                            Register now
                        </Button>
                    </form>

                </div>

            </div>
        )
    }

}

export default Register;
