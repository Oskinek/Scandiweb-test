import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import CartProductCard from '../cartproductcard/CartProductCard.jsx'
import {useSelector} from 'react-redux'
import './cartwindow_styles.css';

function CartWindow(props) {
  const [cart,setCart] = useState(null)
  const [overallQuantity,setOverallQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const currency = useSelector((state) => state.currencySelector.symbol)
  useEffect(() =>{
    setCart(JSON.parse(localStorage.getItem('cart')))
    if(JSON.parse(localStorage.getItem('cart'))!==null) {
      summingTotalAmount(JSON.parse(localStorage.getItem('cart')))
      summingTotalQuantity(JSON.parse(localStorage.getItem('cart')))
    }
  },[props])
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
    return(
      <span>
      <div className={props.cartIsOn === true ? 'cart-window on' : 'cart-window'}>
        <div className="cart-window-container-empty">
          Your cart is empty!
        </div>
      </div>
      <div className="curtain" onClick={props.setOffCart}></div>
    </span>
    )
  }
  return(
    <span>
      <div className="cart-indicator">
        <div className="cart-number">{overallQuantity}</div>
        </div>
      <div className={props.cartIsOn === true ? 'cart-window on' : 'cart-window'}>
        <div className="cart-window-container">
          <div className="cart-header-container">
            <div className="cart-header">my bag</div>
            <div className="product-amount">{overallQuantity} items</div>
          </div>
          <div className="cart-products-container">
            {cart.map(({product,cartAttributes,color,quantity},id) => (
              <CartProductCard key={id} product={product} cartAttributes={cartAttributes} color={color} quantity={quantity}/>
            ))}
          </div>
          <div className="total-amount-container">
            <div className="total">total</div>
            <div className="total-amount">{currency}{totalAmount}</div>
          </div>
          <div className="buttons-container">
            <Link to={'/cart'} className="view-button">view bag</Link>
            <div className="checkout-button">check out</div>
          </div>
        </div>
      </div>
      <div className="curtain" onClick={props.setOffCart}></div>
    </span>
  )
}
export default CartWindow;