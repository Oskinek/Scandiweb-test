import React from 'react';
import './productsizedisplay_styles.css';

class ProductSizeDisplay extends React.Component {
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
      <div className="window-cart-product-sizes-view">
        <div className="window-cart-attribute-name">{this.props.attribute.name}:</div>
        <div className="window-cart-product-sizes-container">
          {this.props.attribute.items.map((attribute) =>(
            <div className={this.state.sizeState === attribute.value ? 'window-cart-product-size active' : 'window-cart-product-size'} key={attribute.name+attribute.value} id={attribute.value}>{attribute.value}</div>
          ))}
        </div>

      </div>
    )
  }
}
export default ProductSizeDisplay;