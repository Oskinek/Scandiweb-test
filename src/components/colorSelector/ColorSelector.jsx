import React from 'react';
import './colorselector_styles.css';

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.changeColor = this.changeColor.bind(this)
  }
  componentDidMount() {
    if(this.props.color===null) {
      console.log(this.props.attribute.items[0].value)
      this.props.liftColorStateUp(this.props.attribute.items[0].value)
    }
  }
  changeColor(event) {
    this.props.liftColorStateUp(event.target.id)
  }

  render() {
    return(
      <div className="product-colors-view">
      <div className="attribute-name">{this.props.attribute.name}:</div>
      <div className="product-color-container">
        {this.props.attribute.items.map((attribute,id) =>(
          <div className={this.props.color===attribute.value ? 'product-color active' : 'product-color'} key={id} id={attribute.value} onClick={this.changeColor} style={{backgroundColor: attribute.value}}></div>
        ))}
      </div>

    </div>
    )
  }
}
export default ColorSelector;