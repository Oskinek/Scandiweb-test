import React from 'react';
import './cartproductsize_styles.css';

class CartProductSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeState: null
    }
  }
  componentDidMount() {
    for(let i=0;i<this.props.cartAttributes.length;i++) {
      if(this.props.attribute.name===this.props.cartAttributes[i].name) {
        this.setState({
          sizeState: this.props.cartAttributes[i].value
        })
      }
    }
  }
  render() {
    return(
      <div className="cart-product-sizes-view">
        <div className="cart-attribute-name">{this.props.attribute.name}:</div>
        <div className="cart-product-sizes-container">
          {this.props.attribute.items.map((attribute) =>(
            <div className={this.state.sizeState === attribute.value ? 'cart-product-size active' : 'cart-product-size'} key={attribute.name+attribute.value} id={attribute.value}>{attribute.value}</div>
          ))}
        </div>

      </div>
    )
  }
}
export default CartProductSize;