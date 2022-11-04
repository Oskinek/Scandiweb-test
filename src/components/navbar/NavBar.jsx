import React from 'react';
import './navbar_styles.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import logo from '../../logo/Group.png'
import DisplayCategories from '../displayCategories/DisplayCategories.jsx'
import Currency from '../currency/Currency.jsx'
import CartWindow from '../cartWindow/CartWindow.jsx'
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartIsOn: false,
    }
    this.changeCartState = this.changeCartState.bind(this);
  }
  changeCartState() {
    this.setState(prevState => ({
      cartIsOn: !prevState.cartIsOn
    }));
  }
  render() {
    return(
      <div className="navbar">
        <div className="categories-flex">
          <DisplayCategories liftStateUp={this.props.liftStateUp}/>
        </div>
        <div className="logo-container">
        <img src={logo} className="logo" alt="logo"></img>
        </div>
        <div className="right-side-buttons">
          <Currency liftCurrencyStateUp={this.props.liftCurrencyStateUp}/>
          <div className="cart">
            <div className="cart-icon" onClick={this.changeCartState}>
              <AiOutlineShoppingCart/>
            </div>
            <div>
              <CartWindow cartIsOn={this.state.cartIsOn} changeCartState={this.changeCartState}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NavBar;