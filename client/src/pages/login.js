import React, { Component} from 'react';
import axios from 'axios'
import md5 from 'md5'
import Button from 'antd/es/button';
import 'antd/dist/antd.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            info: "",
            loading: false,
            iconLoading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        
    }


    handleChange = ({ target }) => {
        const { name, value } = target
       
        this.setState({
            [name]: value
        })
        console.log(this.state)
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
            username: this.state.username,
            password: md5(this.state.password)
        }

        if (payload.username !== '' && payload.password !== '') {
            // Get users from database
            axios({
                url: '/api/log',
                method: 'POST',
                data: payload,
                timeout: 70000,
                headers: { 'Authorization': `Bearer ${this.state.token}` },
            })
                .then((response) => {

                    // Check if the username is already existed
                    const isValid = response.data.msg
                    console.log("res data: ", response.data)
                    if (isValid === false) {
                        this.setState({ info: "Wrong username or password" })
                        this.enterIconLoading()
                        this.enterLoading()
                    }
                    else {
                        this.setState({ info: "You have succesfully login!" })
                        localStorage.setItem('token', response.data.token)
                        setInterval(() => {
                            window.location.href = '/';
                        }, 1000);
                    }


                    console.log(this.state)
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

                        <Button type="primary" loading={this.state.loading} onClick={this.submit}>
                            Login
                        </Button>
                    </form>

                </div>

            </div>
        )
    }

}

export default Login;
