

let localStorageCart = JSON.parse(localStorage.getItem("cart")) || []
const initialState = localStorageCart


const cartReducer = (state = initialState, action) => {
    const cartItems = state
    const product = action.payload

    let itemToAdd = null
    let index = -1;

    function findIndex() {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].product.id === product.id) {
                index = i
            }
        }
    }
    switch (action.type) {
        case "ADD_TOCART":

            findIndex()
            if (index === -1) {
                itemToAdd = [...cartItems, { product, quantity: 1 }]
            } else {
                itemToAdd = [...cartItems]
                itemToAdd[index].quantity += 1
            }

            state = itemToAdd
            localStorage.setItem("cart", JSON.stringify(state))

            return state
        default:
            return state
    }
}

export default cartReducer

