import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './productcard_styles.css';
import addToCartButton from '../addtocartbutton/CircleIcon.png'
import {useSelector,useDispatch} from 'react-redux'
import {addItem} from '../../features/cart/cartSlice'
function ProductCard(props) {
  const [currentAmount,setCurrentAmount] = useState(0)
  const [cartAttributes,setCartAttributes] = useState([])
  const [color,setColor] = useState(null)
  const [product,setProduct] = useState(null)
  const dispatch = useDispatch()
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
    if(product===null) {
      setProduct(props.product)
    }
    setCurrentCurrency()
    setDefaultCartAttributes()
  },[currency])
  function setDefaultCartAttributes() {
    let cartAttributesSet = []
    if(props.product.attributes.length!==0) {
      for(let i=0;i<props.product.attributes.length;i++) {
        if(props.product.attributes[i].type==="text") {
          cartAttributesSet.push({name:props.product.attributes[i].name,value:props.product.attributes[i].items[0].value})
        }
        if(props.product.attributes[i].type==="swatch") {
          setColor(props.product.attributes[i].items[0].value)
        }
      }
      setCartAttributes(cartAttributesSet)
    }
  }
  function addItemToCart() {
    dispatch(addItem({product,cartAttributes,color}))
  }
  return(
    <div className={props.product.inStock === false ? 'product-card out-of-stock' : 'product-card'}>
      <div className="add-to-cart-button">
          <img src={addToCartButton} onClick={addItemToCart} alt="addtoCartButton"></img>
      </div>
      <Link to={`/productdetails/${props.product.name}`} className="product-card-link">
        <div className="out-of-stock-curtain">OUT OF STOCK</div>
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
    </div>
  )
}
export default ProductCard;