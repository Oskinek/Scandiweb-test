import React, {useEffect, useState} from 'react';
import NavBar from '../navbar/NavBar.jsx'
import './cart_styles.css'
import CartProduct from "../cartproduct/CartProduct.jsx"
import {useSelector} from 'react-redux'
function Cart(props) {
  const [cart,setCart] = useState(null)
  const [overallQuantity,setOverallQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [tax,setTax] = useState(0)
  const currency = useSelector((state) => state.currencySelector.symbol)
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
    if(JSON.parse(localStorage.getItem('cart'))!==null) {
      summingTotalAmount(JSON.parse(localStorage.getItem('cart')))
      summingTotalQuantity(JSON.parse(localStorage.getItem('cart')))
    }
  },[props,currency])
  window.addEventListener("storage", () => {
    setCart(JSON.parse(localStorage.getItem('cart')))
    if(JSON.parse(localStorage.getItem('cart'))!==null) {
      summingTotalAmount(JSON.parse(localStorage.getItem('cart')))
      summingTotalQuantity(JSON.parse(localStorage.getItem('cart')))
    }
  })
  function summingTotalAmount(cart) {
    let totalamountsum=0
    for(let i=0; i<cart.length;i++) {
      for(let j=0;j<cart[i].product.prices.length;j++) {
        if(cart[i].product.prices[j].currency.symbol === currency) {
          totalamountsum=totalamountsum+(cart[i].product.prices[j].amount*cart[i].quantity)
        }
      }
      setTotalAmount(totalamountsum.toFixed(2))
      setTax((totalamountsum*0.21).toFixed(2))
    }
  }
  function summingTotalQuantity(cart) {
    let totalquantitysum=0
    for(let i=0;i<cart.length;i++) {
      totalquantitysum=totalquantitysum+cart[i].quantity
    }
    setOverallQuantity(totalquantitysum)
  }
  if(cart===null || cart.length===0) {
    return <div>
      <NavBar/>
      <div className="empty-cart-message">Your cart is empty!</div>
      </div>
  }
  return(
    <div>
      <NavBar/>
      <div className="cart-container">
        <div className="cart-title">cart</div>
        <div className="cart-product-wrapper">
          {cart.map(({product,cartAttributes,color,quantity},id) =>(
            <CartProduct key={id} product={product} cartAttributes={cartAttributes} color={color} quantity={quantity}/>
          ))}
        </div>
        <div className="cart-money-container">
          <div className="description-container">
            <div>Tax 21%: </div>
            <div>Quantity: </div>
            <div className="total-description">Total: </div>
          </div>
          <div className="value-container">
            <div>{currency}{tax}</div>
            <div>{overallQuantity}</div>
            <div>{currency}{totalAmount}</div>
          </div>
        </div>
        <div className="order-button">order</div>
      </div>
    </div>
  )
}
export default Cart;