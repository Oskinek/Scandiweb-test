import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addItem(state,action) {
      const storageCart = JSON.parse(localStorage.getItem('cart'))
      if(storageCart!==null)
      {
        state.cart = storageCart
        const itemInCart = state.cart.find((product) => (JSON.stringify(product.cartAttributes)+(product.product.name)+(product.color)) === (JSON.stringify(action.payload.cartAttributes)+(action.payload.product.name)+(action.payload.color)));
        if (itemInCart) {
          const isSimilar = (product) => JSON.stringify(product)===JSON.stringify(itemInCart)
          const similarIndex = state.cart.findIndex(isSimilar)
          state.cart[similarIndex].quantity++;
        } else {
          let quantity=1;
          state.cart.push({...action.payload,quantity});
        }
      }
      else {
        state.cart.length=0;
        let quantity=1;
        state.cart[0] = ({...action.payload,quantity});
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
      window.dispatchEvent(new Event("storage"))
    },
    addQuantity(state,action) {
      const storageCart = JSON.parse(localStorage.getItem('cart'))
      state.cart = storageCart
      const isSimilar = (product) => (JSON.stringify(product)===JSON.stringify(action.payload))
      const similarIndex = state.cart.findIndex(isSimilar)
      state.cart[similarIndex].quantity++
      localStorage.setItem('cart', JSON.stringify(state.cart))
      window.dispatchEvent(new Event("storage"))
    },
    decreaseQuantity(state,action) {
      const storageCart = JSON.parse(localStorage.getItem('cart'))
      state.cart = storageCart
      const isSimilar = (product) => (JSON.stringify(product)===JSON.stringify(action.payload))
      const similarIndex = state.cart.findIndex(isSimilar)
      state.cart[similarIndex].quantity--
      if(state.cart[similarIndex].quantity===0) {
        const newCart = state.cart.filter(product => (product.quantity!==0))
        state.cart=newCart
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
      window.dispatchEvent(new Event("storage"))
    }
  }
})
export const {
  addItem,
  addQuantity,
  decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer