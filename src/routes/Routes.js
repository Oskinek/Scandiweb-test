import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from '../components/homepage/Homepage.jsx'
import ProductDetails from '../components/productDetails/ProductDetails.jsx'
import Cart from '../components/cart/Cart.jsx'
export default (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  </BrowserRouter>
)