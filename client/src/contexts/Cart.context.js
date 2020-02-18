import React, { Component } from 'react'

export const CartContext = React.createContext()

export class CartProvider extends Component {
  constructor(props) {
    super(props)

    let localCart = localStorage.getItem("cart")
    if (localCart !== 'null' && localCart !== null) {
      localCart = JSON.parse(localCart) // String to array
    } else {
      localCart = []
    }
    this.state = { cartItems: [...localCart] }

    this.addToCart = this.addToCart.bind(this)
  }


  addToCart(product) {
    let { cartItems } = this.state
    let itemToAdd


    let index = -1;
    findProduct()
    function findProduct() {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product.id === product.id) {
          index = i
        }
      }
    }
    if (index === -1) {
      itemToAdd = [...cartItems, { product, quantity: 1 }]
    } else {
      itemToAdd = [...cartItems]
      itemToAdd[index].quantity += 1
    }

    this.setState(state => ({
      cartItems: itemToAdd
    }))

    console.log("state item first", this.state.cartItems)



  }
  componentDidUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))

  }

  render() {
    console.log("state item ", this.state.cartItems)

    return <CartContext.Provider value={{
      cartItems: this.state.cartItems,
      addToCart: this.addToCart
    }}>
      {this.props.children}
    </CartContext.Provider>
  }
}