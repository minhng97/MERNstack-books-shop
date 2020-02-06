import React, {Component} from 'react';
import axios from 'axios'
import md5 from 'md5'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            info: ""
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

    submit = (event) => {
        event.preventDefault()

        const payload = {
            username: this.state.username,
            password: md5(this.state.password)
        }

console.log(md5(payload.password))
        // Get users from database
        axios({
            url: '/api/log',
            method: 'POST',
            data: payload,
            timeout: 70000
        })
            .then((response) => {
    
                // Check if the username is already existed
                const isValid = response.data.msg
                console.log(isValid)
                if (isValid === false) {
                    this.setState({ info: "Wrong username or password" })
                } else {
                    this.setState({ info: "You have succesfully login!" })

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

                        <button>Login</button>
                    </form>

                </div>

            </div>
        )
    }

}

export default Login;
