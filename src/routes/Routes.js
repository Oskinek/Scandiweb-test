import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from '../components/homepage/Homepage.jsx'
import ProductDetails from '../components/productDetails/ProductDetails.jsx'
export default (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
    </Routes>
  </BrowserRouter>
)