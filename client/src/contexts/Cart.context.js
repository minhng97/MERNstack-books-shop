import React, { Component } from 'react'

export const CartContext = React.createContext()

export class CartProvider extends Component {
  constructor(props) {
    console.log("Cart provider constructor")
    super(props)
    
    let localCart = localStorage.getItem("cart")
    if (localCart !== 'null' && localCart !== null) {
      localCart = localCart.split(",") // String to array
    this.setState({ cartItems: localCart })
    } else {
      localCart = []
    }

    this.state = {
      cartItems: localCart
    }

    this.addToCart = this.addToCart.bind(this)
  }

  
  addToCart(product) {
    let stateItems = this.state.cartItems
    let itemToAdd = stateItems.concat(product)
    if(stateItems === []) { itemToAdd = product}

    this.setState({
      cartItems: itemToAdd
    })
    localStorage.setItem("cart", itemToAdd)

  }


  render() {


    return <CartContext.Provider value={{
      cartItems: this.state.cartItems,
      addToCart: this.addToCart
    }}>
      {this.props.children}
    </CartContext.Provider>
  }
}