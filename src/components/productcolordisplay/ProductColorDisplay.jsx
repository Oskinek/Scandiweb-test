import React from 'react';
import './productcolordisplay_styles.css';

class ProductColorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorState: null
    }
  }
  componentDidMount() {
    this.setState({
      colorState: this.props.color
    })
  }
  render() {
    return(
      <div className="cart-product-colors-view">
      <div className="cart-attribute-name">{this.props.attribute.name}:</div>
      <div className="cart-product-color-container">
        {this.props.attribute.items.map((attribute,id) =>(
          <div className={this.state.colorState===attribute.value ? 'cart-product-color active' : 'cart-product-color'} key={id} id={attribute.value} style={{backgroundColor: attribute.value}}></div>
        ))}
      </div>

    </div>
    )
  }
}
export default ProductColorDisplay;