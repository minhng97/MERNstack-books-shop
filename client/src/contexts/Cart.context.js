import React, { Component } from 'react'

export const CartContext = React.createContext()

export class CartProvider extends Component {
  constructor(props) {
    super(props)

    let localCart = JSON.parse(localStorage.getItem("cart")) || []

    this.state = { cartItems: localCart }

    this.addToCart = this.addToCart.bind(this)
  }


  addToCart(product) {
    let { cartItems } = this.state
    let itemToAdd = null
    let index = -1;

    (function findProduct() {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product.id === product.id) {
          index = i
        }
      }
    })()

    if (index === -1) {
      itemToAdd = [...cartItems, { product, quantity: 1 }]
    } else {
      itemToAdd = [...cartItems]
      itemToAdd[index].quantity += 1
    }

    this.setState(state => ({
      cartItems: itemToAdd
    }))




  }
  componentDidUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))

  }

  render() {

    return (
      <CartContext.Provider value={{
        cartItems: this.state.cartItems,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </CartContext.Provider>)

  }
}