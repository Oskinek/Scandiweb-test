import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from '../components/homepage/Homepage.jsx'
export default (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>} />
    </Routes>
  </BrowserRouter>
)