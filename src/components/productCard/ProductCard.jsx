import React from 'react';
import './productcard_styles.css';
import addToCartButton from '../addtocartbutton/CircleIcon.png'

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAmount: this.props.product.prices[0].amount
    }
    this.setCurrency = this.setCurrency.bind(this);
  }
  setCurrency() {
    for(let i=0; i<this.props.product.prices.length;i++) {
      if(this.props.product.prices[i].currency.symbol === this.props.currentCurrency) {
        this.setState({
          currentAmount : this.props.product.prices[i].amount
        })
        break;
      }
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.currentCurrency !== this.props.currentCurrency) {
      this.setCurrency();
    }
  }
  render() {
    return(
      <div className={this.props.product.inStock === false ? 'product-card out-of-stock' : 'product-card'}>
        <div className="out-of-stock-curtain">OUT OF STOCK</div>
        <div className="add-to-cart-button">
          <img src={addToCartButton} alt="addtoCartButton"></img>
        </div>
        <img src={this.props.product.gallery[0]} alt={this.props.product.name + "image"}></img>
        <div className="product-label">
          <div className="brand">{this.props.product.brand}&nbsp;</div>
          <div className="name">{this.props.product.name}</div>
        </div>
        <div className="price">
          <div className="price-symbol">{this.props.currentCurrency}</div>
          <div className="amount">{this.state.currentAmount}</div>
        </div>
      </div>
    )
  }
}
export default ProductCard;