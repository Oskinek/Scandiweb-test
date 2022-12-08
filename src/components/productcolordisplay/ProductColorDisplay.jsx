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
      <div className="window-cart-product-colors-view">
      <div className="window-cart-attribute-name">{this.props.attribute.name}:</div>
      <div className="window-cart-product-color-container">
        {this.props.attribute.items.map((attribute,id) =>(
          <div className={this.state.colorState===attribute.value ? 'window-cart-product-color active' : 'window-cart-product-color'} key={id} id={attribute.value} style={{backgroundColor: attribute.value}}></div>
        ))}
      </div>

    </div>
    )
  }
}
export default ProductColorDisplay;