import React , {useState,useEffect}from 'react';
import './cartproductcard_styles.css';
import ProductSizeDisplay from '../productsizedisplay/ProductSizeDisplay.jsx'
import ProductColorDisplay from '../productcolordisplay/ProductColorDisplay.jsx'
import plussquare from '../quantitysquares/plus-square.png'
import minussquare from '../quantitysquares/minus-square.png'
import {useSelector,useDispatch} from 'react-redux'
import {addQuantity,decreaseQuantity} from '../../features/cart/cartSlice'
function CartProductCard(props) {  
  const [currentAmount, setCurrentAmount] = useState(0)
  const dispatch = useDispatch()
  const currency = useSelector((state) => state.currencySelector.symbol)
  function Attribute(props) {
    if(props.type==="text") {
      return <ProductSizeDisplay attribute={props.attribute} cartAttributes={props.cartAttributes}/> 
    }
    else {
      if(props.type==="swatch") {
        return <ProductColorDisplay attribute={props.attribute} color={props.color}/>
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
        <div className="cart-product-card">
      <div className="cart-window-product-info-container">
        <div className="cart-window-product-name">{props.product.brand}</div>
        <div className="cart-window-product-name">{props.product.name}</div>
        <div className="cart-window-product-price">{currency}{currentAmount}</div>
        {props.product.attributes.map((attribute,id) =>(
          <Attribute key={id} type={attribute.type} attribute={attribute} cartAttributes={props.cartAttributes} color={props.color}/>
        ))}
      </div>
      <div className="quantity-container">
        <img src={plussquare} alt={"addquantitysquare"} onClick={addingQuantity}></img>
        <div className="quantity">{props.quantity}</div>
        <img src={minussquare} alt={"minusquantitysquare"} onClick={decreasingQuantity}></img>
      </div>
      <div className="cart-window-product-image">
        <img src={props.product.gallery[0]} alt={props.product.name+"image"}></img>
      </div>
    </div>
  )
}
export default CartProductCard;