import React, { Component } from 'react'

export const UserContext = React.createContext()

export class UserState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: null,
            cartItems: []
        }
        this.addToCart = this.addToCart.bind(this)
        this.logout = this.logout.bind(this)
    }

    addToCart(product) {
        console.log(" Added ", product)
        this.setState({
            cartItems: this.state.cartItems.concat(this.product)
        })
    }
    savelogin() {
        this.setState({ login: true })
    }
    logout() {
        this.setState({ login: false })
    }

    render() {
        return <UserContext.Provider value={{
            login: this.state.login,
            cartItems: this.state.cartItems,
            addToCart: this.addToCart,
            savelogin:this.savelogin,
            logout: this.logout
        }}>
            {this.props.children}
        </UserContext.Provider>
    }
}