import React from 'react';
import './homepage.css'
import NavBar from '../navbar/NavBar.jsx'
import Category from '../category/Category.jsx'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      currency: '',
    }
  }
  liftStateUp = (data) => {
    this.setState({category: data})
  }
  liftCurrencyStateUp = (data) => {
    this.setState({currency: data})
  }
  render() {
    return(
      <div className='homepage'>
        <NavBar liftStateUp={this.liftStateUp} liftCurrencyStateUp={this.liftCurrencyStateUp}/>
        <Category Currentcategory={this.state.category} currentCurrency={this.state.currency}/>
      </div>
    )
  }
}
export default Homepage;