import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './productcard_styles.css';
import addToCartButton from '../addtocartbutton/CircleIcon.png'
import {useSelector} from 'react-redux'
function ProductCard(props) {
  const [currentAmount,setCurrentAmount] = useState(0)
  const currency = useSelector((state => state.currencySelector.symbol))
  function setCurrentCurrency() {
    for(let i=0; i<props.product.prices.length;i++) {
      if(props.product.prices[i].currency.symbol === currency) {
        setCurrentAmount(props.product.prices[i].amount.toFixed(2))
        break;
      }
    }
  }
  useEffect(() => {
    setCurrentCurrency()
  },[currency])
  return(
    <Link to={`/productdetails/${props.product.name}`} className={props.product.inStock === false ? 'product-card out-of-stock' : 'product-card'}>
      <div className="out-of-stock-curtain">OUT OF STOCK</div>
      <div className="add-to-cart-button">
          <img src={addToCartButton} alt="addtoCartButton"></img>
      </div>
      <img src={props.product.gallery[0]} alt={props.product.name + "image"}></img>
      <div className="product-label">
        <div className="brand">{props.product.brand}&nbsp;</div>
        <div className="name">{props.product.name}</div>
      </div>
      <div className="price">
        <div className="price-symbol">{props.currentCurrency}</div>
        <div className="amount">{currentAmount}</div>
      </div>
    </Link>
  )
}
export default ProductCard;