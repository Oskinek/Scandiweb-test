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
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changeCartState = this.changeCartState.bind(this);
    this.setOffCart = this.setOffCart.bind(this);
  }
  changeCartState() {
    this.setState(prevState => ({
      cartIsOn: !prevState.cartIsOn
    }));
  }
  setOffCart() {
    this.setState({
      cartIsOn: false
    }
    )
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    if(this.state.cartIsOn===true) {
      if(this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.setOffCart();
      }
    }
  }
  render() {
    return(
      <div className="navbar">
        <div className="categories-flex">
          <DisplayCategories/>
        </div>
        <div className="logo-container">
        <img src={logo} className="logo" alt="logo"></img>
        </div>
        <div className="right-side-buttons">
          <Currency/>
          <div className="cart" ref={this.wrapperRef}>
            <div className="cart-icon" onClick={this.changeCartState}>
              <AiOutlineShoppingCart/>
            </div>
            <div>
              <CartWindow cartIsOn={this.state.cartIsOn} setOffCart={this.setOffCart}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NavBar;