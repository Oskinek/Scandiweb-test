import React, {useState,useEffect} from 'react';
import './cartproduct_styles.css'
import CartProductSize from '../cartproductsize/CartProductSize.jsx'
import CartProductColor from '../cartproductcolor/CartProductColor.jsx'
import plussquare from '../quantitysquares/plus-square.png'
import minussquare from '../quantitysquares/minus-square.png'
import {useDispatch, useSelector} from 'react-redux'
import {addQuantity,decreaseQuantity} from '../../features/cart/cartSlice'
import CartSlideshow from '../cartslideshow/CartSlideshow'
function CartProduct(props) {
  const [currentAmount, setCurrentAmount] = useState(0)
  const dispatch = useDispatch()
  const currency = useSelector((state) => state.currencySelector.symbol)
  function Attribute(props) {
    if(props.type==="text") {
      return <CartProductSize attribute={props.attribute} cartAttributes={props.cartAttributes}/>
    }
    else {
      if(props.type==="swatch") {
        return <CartProductColor attribute={props.attribute} color={props.color}/>
      }
    }
  }
  function addingQuantity() {
    dispatch(addQuantity(props))
  }
  function decreasingQuantity() {
    dispatch(decreaseQuantity(props))
  }
  function setCurrentCurrency() {
    for(let i=0; i<props.product.prices.length;i++) {
      if(props.product.prices[i].currency.symbol === currency) {
          setCurrentAmount(props.product.prices[i].amount.toFixed(2));
          break;
        }
    }
  }
    useEffect(() => {
      setCurrentCurrency()
    },[currency])
  return(
    <div className="cart-product-container">
      <div className="cart-product-info-container">
        <div className="cart-product-details-left-container">
          <div className="cart-product-brand">{props.product.brand}</div>
          <div className="cart-product-name">{props.product.name}</div>
          <div className="cart-product-price">{currency}{currentAmount}</div>
          {props.product.attributes.map((attribute,id) =>(
            <Attribute key={id} type={attribute.type} attribute={attribute} cartAttributes={props.cartAttributes} color={props.color}/>
          ))}
        </div>
        <div className="cart-product-details-right-container">
          <div className="cart-quantity-container">
            <img src={plussquare} alt={"addquantitysquare"} onClick={addingQuantity}></img>
            <div className="quantity">{props.quantity}</div>
            <img src={minussquare} alt={"minusquantitysquare"} onClick={decreasingQuantity}></img>
          </div>
          <CartSlideshow gallery={props.product.gallery}/>
        </div>
      </div>
    </div>
  )
}
export default CartProduct;