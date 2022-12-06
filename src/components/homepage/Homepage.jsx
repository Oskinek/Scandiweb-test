import React from 'react';
import './homepage.css'
import NavBar from '../navbar/NavBar.jsx'
import Category from '../category/Category.jsx'

class Homepage extends React.Component {
  render() {
    return(
      <div className='homepage'>
        <NavBar/>
        <Category/>
      </div>
    )
  }
}
export default Homepage;