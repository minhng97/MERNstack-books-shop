import React, { Component } from 'react';
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
            password: this.state.password
        }
        // Save item to database
        axios({
            url: '/api/login',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('data has been sent to server');
            })
            .catch(() => console.log('500 internal error'))
    }


    render() {
        //JSX
        return (
            <div className="app">

                <form onSubmit={() => this.submit()}>
                    <div className="form-input">
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={this.handleChange}>
                        </input>
                    </div>

                    <button>Submit</button>
                </form>



            </div>
        )
    }

}

export default Login;
