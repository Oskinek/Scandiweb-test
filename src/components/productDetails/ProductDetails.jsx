import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import SlideShow from '../slideshow/SlideShow.jsx'
import './productdetails.css';
import { useQuery,gql } from '@apollo/client';
import ProductSizeSelector from '../productSizeSelector/ProductSizeSelector.jsx'
import ColorSelector from '../colorSelector/ColorSelector.jsx'
import NavBar from '../navbar/NavBar.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {addItem} from '../../features/cart/cartSlice'
import {removeItem} from '../../features/cart/cartSlice'

const GET_PRODUCTS = gql`
query GetProducts($title: String!) {
  category(input: {title: $title}) {
    products {
      name
      gallery
      brand
      prices {
        amount
        currency {
          symbol
        }
      }
      description
      attributes {
        name
        type
        items {
          value
        }
      }
    }
  }
}
`
;
function ProductDetails() {
  const {loading,error,data} = useQuery(GET_PRODUCTS, {variables: {title: "all"}})
  const currencySymbol = useSelector((state) => state.currencySelector.symbol)
  const dispatch = useDispatch()
  const [amount,setAmount] = useState(null);
  const [product,setProduct] = useState(null);
  let [cartAttributes,setCartAttributes] = useState([]);
  const [color,setColor] = useState(null)
  const [attributes,setAttributes] = useState(null)
  const {id} = useParams();
  function deletecart() {
    dispatch(removeItem())
  } 
  function addItemToCart() {
    dispatch(addItem({product, cartAttributes,color}))
  }
  function settingDefaultSizeState(data) {
    if(!(cartAttributes.find(obj => obj.name === data.name))) {
      cartAttributes.push(data)
    }
  }
  function liftColorStateUp(data) {
    setColor(data);
  }
  function liftSizeStateUp(data) {
    const newState = cartAttributes.map((obj) =>{
      if(obj.name===data.name) {
        return {...obj, value: data.value}
      } else {
        return obj
      }
    })
    setCartAttributes(newState);
  }
  function Attribute(props) {
    if(props.type==="text") {
      return <ProductSizeSelector settingDefaultSizeState={settingDefaultSizeState} liftSizeStateUp={liftSizeStateUp} attribute={props.attribute} cartAttributes={cartAttributes}/>
    }
    else {
      if(props.type==="swatch") {
        return <ColorSelector attribute = {props.attribute} liftColorStateUp={liftColorStateUp} color={color}/>
      }
    }
  }
  function createMarkUp(description) {
    return {__html: description};
  }
  useEffect(() => {
    if(data !== undefined) {
      for(let i=0; i<data.category.products.length;i++) {
        if(data.category.products[i].name === id) {
          setProduct(data.category.products[i])
          setAttributes(data.category.products[i].attributes)
          for(let j=0; j<data.category.products[i].prices.length;j++) {
            if(data.category.products[i].prices[j].currency.symbol === currencySymbol) {
              setAmount(data.category.products[i].prices[j].amount.toFixed(2))
            }
          }
        }
      }
    }
    
  },[data,id,currencySymbol]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if(product === null) return <p>Loading...</p>
  return (
    <div>
        <NavBar/>
      <div className="product-details-container">
        <SlideShow gallery={product.gallery}/>
        <div className="product-details">
          <div className="brand-details">{product.brand}</div>
          <div className="name-details">{product.name}</div>
          {attributes.map((attribute,id) =>(
            <Attribute key={id} type={attribute.type} attribute={attribute}/>
            ))}
          <div className="price-details-container">
            <div className="attribute-name" onClick={deletecart}>Price:</div>
            <div className="price-details">{currencySymbol}{amount}</div>
          </div>
          <div className="add-to-cart-button-details" onClick={addItemToCart}>add to cart</div>
          <div className="description-details" dangerouslySetInnerHTML={createMarkUp(product.description)}></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;