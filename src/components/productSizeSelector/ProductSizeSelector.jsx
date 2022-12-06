import React from 'react';
import './productsizeselector_styles.css';

class ProductSizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeState: null
    }
    this.changeSize = this.changeSize.bind(this);
    this.setActiveSize = this.setActiveSize.bind(this);
  }
  componentDidMount() {
    if(this.state.sizeState===null) {
      this.setState({
        sizeState: this.props.attribute.items[0].value
      })
      this.props.settingDefaultSizeState({name:this.props.attribute.name,value:this.props.attribute.items[0].value})
    }
  }
  changeSize(event) {
    this.setState({
      sizeState:event.target.id
    })
    this.props.liftSizeStateUp({name:this.props.attribute.name,value:event.target.id})
  }
  setActiveSize(attribute) {
    var activeAttribute= this.props.cartAttributes.find(obj => obj.name===attribute.name)
    if(activeAttribute===undefined) {
      return null
    }
    return activeAttribute.value
  }
  render() {
    return(
      <div className="product-sizes-view">
        <div className="attribute-name">{this.props.attribute.name}:</div>
        <div className="product-sizes-container">
          {this.props.attribute.items.map((attribute) =>(
            <div className={this.setActiveSize(this.props.attribute) === attribute.value ? 'product-size active' : 'product-size'} onClick={this.changeSize} key={attribute.name+attribute.value} id={attribute.value}>{attribute.value}</div>
          ))}
        </div>

      </div>
    )
  }
}
export default ProductSizeSelector;