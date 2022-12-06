import { configureStore } from '@reduxjs/toolkit'
import categorySelectorReducer from './features/categoryselector/categorySelectorSlice'
import currencySelectorReducer from './features/currencyselector/currencySelectorSlice'
import cartReducer from './features/cart/cartSlice'
import currencyToggleReducer from './features/currencytoggle/currencyToggleSlice.js'
import totalAmountReducer from './features/totalamount/totalAmountSlice'
export default configureStore({
  reducer: {
    totalAmount: totalAmountReducer, 
    categorySelector: categorySelectorReducer,
    currencySelector: currencySelectorReducer,
    cart: cartReducer,
    currencyToggle: currencyToggleReducer,
  },
})