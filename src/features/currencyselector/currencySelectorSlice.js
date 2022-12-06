import { createSlice } from '@reduxjs/toolkit'

export const currencySelectorSlice = createSlice({
  name: 'currencySelector',
  initialState: {
    symbol: '$',
  },
  reducers: {
    changeCurrency(state,action) {
      state.symbol= action.payload
    }
  }
})
export const {changeCurrency} = currencySelectorSlice.actions

export default currencySelectorSlice.reducer