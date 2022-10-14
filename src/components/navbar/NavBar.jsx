import React from 'react';
import './navbar_styles.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import logo from '../../logo/Group.png'
import DisplayCategories from '../displayCategories/DisplayCategories.jsx'
import Currency from '../currency/Currency.jsx'
class NavBar extends React.Component {
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
          <div className="cart">
            <AiOutlineShoppingCart/>
          </div>
        </div>
      </div>
    )
  }
}
export default NavBar;