import React from 'react';
import './cartwindow_styles.css';

class CartWindow extends React.Component {
  render() {
    localStorage.setItem('test', 'tescik');
    return(
      <span>
        <div className={this.props.cartIsOn === true ? 'cart-window on' : 'cart-window'}>
          <h1>eloszka</h1>
        </div>
        <div className="curtain" onClick={this.props.changeCartState}></div>
      </span>
    )
  }
}
export default CartWindow;